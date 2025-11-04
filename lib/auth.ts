import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "./firebase";

export async function signOutUser(): Promise<void> {
  const a = getFirebaseAuth();
  if (a) {
    await signOut(a);
  }
}
