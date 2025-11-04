import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "../components/NavBar";

export const metadata: Metadata = {
  title: "Auth Starter",
  description: "Email/password auth with Firebase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
