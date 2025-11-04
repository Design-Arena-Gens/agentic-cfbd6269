"use client";
import { AuthForm } from "../../../components/AuthForm";

export default function SignUpPage() {
  return (
    <main className="space-y">
      <h1>Sign Up</h1>
      <AuthForm mode="signup" />
    </main>
  );
}
