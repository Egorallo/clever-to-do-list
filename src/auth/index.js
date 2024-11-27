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
    const errorMessages = {
      'auth/user-not-found': 'User not found',
      'auth/email-already-in-use': 'Email already in use',
      'auth/invalid-credential': 'Email or password is incorrect',
      'auth/invalid-email': 'Invalid email',
      'auth/missing-email': 'Missing email',
      'auth/missing-password': 'Missing password',
      'auth/weak-password': 'Weak password (Minimum 6 characters)',
    };
    const message = errorMessages[error.code] || 'An unknown error occurred, refresh the page';
    throw new Error(message);
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
