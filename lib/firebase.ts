import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

let clientApp: FirebaseApp | null = null;

export function getFirebaseAuth(): Auth | null {
  if (typeof window === "undefined") return null;

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

  if (!apiKey || !authDomain || !projectId || !appId) return null;

  if (!clientApp) {
    const firebaseConfig = { apiKey, authDomain, projectId, appId } as const;
    clientApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0] as FirebaseApp;
  }

  return getAuth(clientApp);
}
