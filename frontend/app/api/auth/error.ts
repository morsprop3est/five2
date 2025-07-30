import { useRouter } from 'next/router';

export default function AuthError() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div>
      <h1>Authentication Error</h1>
      {error && <p>{error}</p>}
      <button onClick={() => router.push('/')}>Go to Home</button>
    </div>
  );
}