import { doc, deleteDoc, updateDoc, getDoc, getDocs, addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';

export async function addNewTask(userId, newTask) {
  try {
    const userTasksRef = collection(doc(db, 'users', userId), 'tasks');
    await addDoc(userTasksRef, {
      title: newTask.title,
      description: newTask.description,
      done: newTask.done,
      date: newTask.date,
    });
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

export async function deleteTask(userId, taskId) {
  const taskDocRef = doc(db, `users/${userId}/tasks`, taskId);
  await deleteDoc(taskDocRef);
}

export async function updateTask(userId, taskId, updatedData) {
  try {
    const taskDocRef = doc(db, `users/${userId}/tasks`, taskId);
    await updateDoc(taskDocRef, updatedData);
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

export async function getTaskById(userId, taskId) {
  const taskDocRef = doc(db, `users/${userId}/tasks`, taskId);
  const taskDoc = await getDoc(taskDocRef);
  if (taskDoc.exists()) {
    return { id: taskDoc.id, ...taskDoc.data() };
  } else {
    console.error('No such document');
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
