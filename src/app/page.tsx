import { signIn, signOut, useSession } from 'next-auth';

export default function Home() {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {!session && (
        <>
          <button onClick={() => signIn('github')}>Login with GitHub</button>
        </>
      )}
      {session && (
        <>
          <h1>You are logged in {session.user.email}</h1>
          <button onClick={() => signOut()}>Logout</button>
        </>
      )}
    </div>
  );
}
