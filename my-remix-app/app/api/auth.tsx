import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "../config/firebase";

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export async function googleLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    return { result };
  } catch (err) {
    throw new Error("err.message");
  }
}
export async function logout() {
  const res = await auth.signOut();

  return res;
}
