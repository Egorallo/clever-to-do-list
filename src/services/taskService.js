import { doc, deleteDoc, updateDoc, getDoc, getDocs, addDoc, collection } from 'firebase/firestore';
import { db } from './firebaseInit';

export async function addNewTask(userId, newTask) {
  const userTasksRef = collection(doc(db, 'users', userId), 'tasks');
  await addDoc(userTasksRef, {
    title: newTask.title,
    description: newTask.description,
    done: newTask.done,
    date: newTask.date,
  });
}

export async function deleteTask(userId, taskId) {
  const taskDocRef = doc(db, `users/${userId}/tasks`, taskId);
  await deleteDoc(taskDocRef);
}

export async function updateTask(userId, taskId, updatedData) {
  const taskDocRef = doc(db, `users/${userId}/tasks`, taskId);
  await updateDoc(taskDocRef, updatedData);
}

export async function getTaskById(userId, taskId) {
  const taskDocRef = doc(db, `users/${userId}/tasks`, taskId);
  const taskDoc = await getDoc(taskDocRef);
  if (taskDoc.exists()) {
    return { id: taskDoc.id, ...taskDoc.data() };
  }
}

export async function getTasks(userId) {
  const userTasksRef = collection(doc(db, 'users', userId), 'tasks');
  const taskSnapshot = await getDocs(userTasksRef);
  const taskList = taskSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return taskList;
}

export async function changeTaskstatusTo(userId, taskId, status) {
  const taskDocRef = doc(db, `users/${userId}/tasks`, taskId);
  await updateDoc(taskDocRef, { done: status });
}
