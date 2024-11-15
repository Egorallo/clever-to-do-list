import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fireSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
// import { AuthErrorCodes } from 'firebase/auth';

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
  console.log('aboba');
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCreds.user);
    return userCreds;
  } catch (error) {
    throw new Error(`${error.code}`);
  }
}

export async function signUp(email, password) {
  try {
    const userCreds = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User signed up:', userCreds.user);
    return userCreds;
  } catch (error) {
    throw new Error(`${error.code}`);
  }
}

export async function signOut() {
  try {
    await fireSignOut(auth);
    console.log('User signed out');
  } catch (error) {
    throw new Error(`${error.code}`);
  }
}
