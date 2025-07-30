import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

const createUserPhotoStorage = (basePath: string) => {
  return multer.diskStorage({
    destination: (req: Request, file: any, cb: (error: Error | null, destination: string) => void) => {
      const userId = req.params.userId || req.body.userId;
      if (!userId) {
        return cb(new Error('User ID is required'), '');
      }

      const dir = path.join(basePath, userId);

      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          console.log(`Directory created: ${dir}`);
        }
        cb(null, dir); 
      } catch (error) {
        console.error(`Error creating directory: ${dir}`, error);
        cb(error as Error, '');
      }
    },
    filename: (req: Request, file: any, cb: (error: Error | null, filename: string) => void) => {
      const timestamp = Date.now();
      const originalName = file.originalname;
      const extension = path.extname(originalName);
      const nameWithoutExt = path.basename(originalName, extension);
      const filename = `${nameWithoutExt}_${timestamp}${extension}`;
      cb(null, filename);
    },
  });
};

const userPhotoStorage = createUserPhotoStorage('uploads/users');

const fileFilter = (req: Request, file: any, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.'));
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024,
  files: 10 
};

export const uploadUserPhoto = multer({ 
  storage: userPhotoStorage,
  fileFilter,
  limits
}).single('photo');

export const uploadUserPhotos = multer({ 
  storage: userPhotoStorage,
  fileFilter,
  limits
}).array('photos', 10);

export const uploadListingPhoto = multer({ 
  storage: userPhotoStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 20
  }
}).array('photos', 20);