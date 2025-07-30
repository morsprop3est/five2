const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'secret-key'; 

async function deriveKey(password: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('five2-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

export async function encryptData(data: string): Promise<string> {
  try {
    const key = await deriveKey(ENCRYPTION_KEY);
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoder.encode(data)
    );
    
    const encryptedArray = new Uint8Array(encrypted);
    const result = new Uint8Array(iv.length + encryptedArray.length);
    result.set(iv);
    result.set(encryptedArray, iv.length);
    
    return btoa(String.fromCharCode(...result));
  } catch (error) {
    console.error('Encryption error:', error);
    return btoa(data);
  }
}

export async function decryptData(encryptedData: string): Promise<string> {
  try {
    const key = await deriveKey(ENCRYPTION_KEY);
    
    const data = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    
    const iv = data.slice(0, 12);
    const encrypted = data.slice(12);
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted
    );
    
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    try {
      return atob(encryptedData);
    } catch {
      throw new Error('Failed to decrypt data');
    }
  }
}

export function encryptDataSync(data: string): string {
  return btoa(data);
}

export function decryptDataSync(encryptedData: string): string {
  return atob(encryptedData);
}

export class CacheManager {
  private static instance: CacheManager;
  
  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }
  
  async set(key: string, data: any, expiryMinutes: number = 5): Promise<void> {
    try {
      const cacheData = {
        data,
        expiry: Date.now() + (expiryMinutes * 60 * 1000)
      };
      
      const encrypted = await encryptData(JSON.stringify(cacheData));
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  }
  
  async get(key: string): Promise<any | null> {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      
      const decrypted = await decryptData(encrypted);
      const cacheData = JSON.parse(decrypted);
      
      if (Date.now() > cacheData.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      
      return cacheData.data;
    } catch (error) {
      console.error('Error getting cache:', error);
      return null;
    }
  }
  
  remove(key: string): void {
    localStorage.removeItem(key);
  }
  
  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes('cache') || key.includes('five2')) {
        localStorage.removeItem(key);
      }
    });
  }
} 