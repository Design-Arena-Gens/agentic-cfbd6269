"use client";
import { FormEvent, useMemo, useState } from "react";
import { getFirebaseAuth } from "../lib/firebase";
import { validateEmail, validatePassword } from "../lib/validators";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

type Mode = "signin" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const emailError = useMemo(() => validateEmail(email), [email]);
  const passwordError = useMemo(() => validatePassword(password), [password]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (emailError || passwordError) return;

    try {
      setLoading(true);
      const a = getFirebaseAuth();
      if (!a) {
        setError("Firebase is not configured");
        return;
      }
      if (mode === "signup") {
        await createUserWithEmailAndPassword(a, email, password);
        setMessage("Account created successfully! You are now signed in.");
      } else {
        await signInWithEmailAndPassword(a, email, password);
        setMessage("Signed in successfully!");
      }
    } catch (err: any) {
      const code = err?.code ?? "auth/error";
      const friendly = toFriendlyError(code);
      setError(friendly);
    } finally {
      setLoading(false);
    }
  }

  const title = mode === "signup" ? "Create an account" : "Welcome back";
  const submitLabel = loading ? (mode === "signup" ? "Creating..." : "Signing in...") : (mode === "signup" ? "Sign Up" : "Sign In");
  const altLinkHref = mode === "signup" ? "/auth/signin" : "/auth/signup";
  const altLinkText = mode === "signup" ? "Already have an account? Sign in" : "Need an account? Sign up";

  return (
    <form onSubmit={onSubmit} className="card">
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      {!process.env.NEXT_PUBLIC_FIREBASE_API_KEY && (
        <div className="banner" style={{ marginBottom: 12 }}>
          Firebase not configured. Set NEXT_PUBLIC_FIREBASE_* env vars to enable.
        </div>
      )}
      <label className="label" htmlFor="email">Email</label>
      <input
        id="email"
        className="input"
        type="email"
        value={email}
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      {emailError && <div className="error">{emailError}</div>}

      <label className="label" htmlFor="password">Password</label>
      <input
        id="password"
        className="input"
        type="password"
        value={password}
        autoComplete={mode === "signup" ? "new-password" : "current-password"}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="At least 8 chars, mixed case, a number"
      />
      {passwordError && <div className="error">{passwordError}</div>}

      <div className="row" style={{ marginTop: 16 }}>
        <button className="btn" type="submit" disabled={!!emailError || !!passwordError || loading}>
          {submitLabel}
        </button>
        <Link className="btn" href={altLinkHref}>{altLinkText}</Link>
      </div>

      {error && <div className="error" style={{ marginTop: 12 }}>{error}</div>}
      {message && <div className="success" style={{ marginTop: 12 }}>{message}</div>}
    </form>
  );
}

function toFriendlyError(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email is already in use";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/weak-password":
      return "Password is too weak";
    case "auth/user-not-found":
      return "User not found";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/too-many-requests":
      return "Too many attempts, please try later";
    default:
      return "Authentication failed. Please try again.";
  }
}
