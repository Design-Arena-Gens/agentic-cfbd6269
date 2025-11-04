"use client";
import { AuthForm } from "../../../components/AuthForm";

export default function SignInPage() {
  return (
    <main className="space-y">
      <h1>Sign In</h1>
      <AuthForm mode="signin" />
    </main>
  );
}
