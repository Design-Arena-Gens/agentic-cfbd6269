"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { getFirebaseAuth } from "../lib/firebase";

export function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const a = getFirebaseAuth();
    if (!a) return;
    const unsub = onAuthStateChanged(a, (u) => setUser(u));
    return () => unsub();
  }, []);

  async function handleSignOut() {
    try {
      setSigningOut(true);
      const a = getFirebaseAuth();
      if (a) {
        await signOut(a);
      }
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <nav className="nav">
      <Link href="/">Auth Starter</Link>
      <div className="row">
        {user ? (
          <>
            <span style={{ opacity: 0.8 }}>{user.email}</span>
            <button className="btn" onClick={handleSignOut} disabled={signingOut}>
              {signingOut ? "Signing out..." : "Sign Out"}
            </button>
          </>
        ) : (
          <>
            <Link className="btn" href="/auth/signup">Sign Up</Link>
            <Link className="btn" href="/auth/signin">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
}
