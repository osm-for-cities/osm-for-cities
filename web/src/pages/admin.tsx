import { signOut, useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <p>Signed in as {JSON.stringify(session)}</p>

        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return <a href="/api/auth/signin">Sign in</a>;
}

AdminPage.auth = true;
