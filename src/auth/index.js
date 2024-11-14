import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fireSignOut,
} from 'firebase/auth';
// import { AuthErrorCodes } from 'firebase/auth';

export async function signIn(email, password) {
  console.log('aboba');
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCreds.user);
  } catch (error) {
    console.log('Error signing in: ', error);
  }
}

export async function signUp(email, password) {
  try {
    const userCreds = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User signed up:', userCreds.user);
  } catch (error) {
    console.log('Error signing up: ', error);
  }
}

export async function signOut() {
  try {
    await fireSignOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.log('Error signing out: ', error);
  }
}
