"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseAuth } from "../lib/firebase";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const a = getFirebaseAuth();
    if (!a) return;
    const unsub = onAuthStateChanged(a, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <main className="space-y">
      <h1>Welcome</h1>
      {!process.env.NEXT_PUBLIC_FIREBASE_API_KEY && (
        <div className="banner">
          Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars to enable auth.
        </div>
      )}

      <div className="card space-y">
        {user ? (
          <>
            <p className="success">Signed in as {user.email}</p>
            <p>You can now sign out from the top right.</p>
          </>
        ) : (
          <>
            <p>Get started by creating an account or signing in:</p>
            <div className="row">
              <Link className="btn" href="/auth/signup">Sign Up</Link>
              <Link className="btn" href="/auth/signin">Sign In</Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
