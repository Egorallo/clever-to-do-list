import { auth } from './firebaseInit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fireSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { ERROR_MESSAGES } from '../constants/errors';

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
    const message = ERROR_MESSAGES[error.code] || 'An unknown error occurred, refresh the page';
    return { failed: true, message };
  }
}

export async function signUp(email, password) {
  try {
    const userCreds = await createUserWithEmailAndPassword(auth, email, password);
    return userCreds;
  } catch (error) {
    const message = ERROR_MESSAGES[error.code] || 'An unknown error occurred, refresh the page';
    return { failed: true, message };
  }
}

export async function signOut() {
  try {
    await fireSignOut(auth);
  } catch (error) {
    throw new Error(`${error.code}`);
  }
}
