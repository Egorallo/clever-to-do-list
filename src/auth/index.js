import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fireSignOut,
  onAuthStateChanged,
} from 'firebase/auth';

export const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject,
    );
  });
};

export async function signIn(email, password) {
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password);
    return userCreds;
  } catch (error) {
    throw new Error(`${error.code}`);
  }
}

export async function signUp(email, password) {
  try {
    const userCreds = await createUserWithEmailAndPassword(auth, email, password);
    return userCreds;
  } catch (error) {
    throw new Error(`${error.code}`);
  }
}

export async function signOut() {
  try {
    await fireSignOut(auth);
  } catch (error) {
    throw new Error(`${error.code}`);
  }
}
