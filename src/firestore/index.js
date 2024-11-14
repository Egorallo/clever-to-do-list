import { doc, deleteDoc, updateDoc, getDoc, getDocs, addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';

export async function addNewTask(newTask) {
  try {
    const taskCollectionRef = collection(db, 'tasks');
    await addDoc(taskCollectionRef, {
      title: newTask.title,
      description: newTask.description,
      done: newTask.done,
      date: newTask.date,
    });
    console.log('Task added:', newTask);
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

export async function deleteTask(taskId) {
  const taskDocRef = doc(db, 'tasks', taskId);
  await deleteDoc(taskDocRef);
  console.log('Task deleted');
}

export async function updateTask(taskId, updatedData) {
  const taskDocRef = doc(db, 'tasks', taskId);
  await updateDoc(taskDocRef, updatedData);
  console.log('Task updated');
}

export async function getTaskById(taskId) {
  const taskDocRef = doc(db, 'tasks', taskId);
  const taskDoc = await getDoc(taskDocRef);
  if (taskDoc.exists()) {
    return { id: taskDoc.id, ...taskDoc.data() };
  } else {
    console.error('No such document');
  }
}

export async function getTasks() {
  const taskCollectionRef = collection(db, 'tasks');
  const taskSnapshot = await getDocs(taskCollectionRef);
  const taskList = taskSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return taskList;
}

export async function changeTaskstatusTo(taskId, status) {
  const taskDocRef = doc(db, 'tasks', taskId);
  await updateDoc(taskDocRef, { done: status });
  console.log('Task status changed');
}
