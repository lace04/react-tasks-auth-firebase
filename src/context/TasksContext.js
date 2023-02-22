import { createContext, useContext, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { v4 as uuid } from 'uuid';

export const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context)
    throw new Error('useTasks must be used within a TasksContextProvider');
  return context;
};

export const TasksContextProvider = ({ children }) => {
  const { logout, user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  //getTask for userId
  const getTasks = async () => {
    setLoading(true);
    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setTasks(docs);
    setLoading(false);
  };

  const createTask = async (title, description, done) => {
    setAdding(true);
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        id: uuid(),
        title: title,
        description: description,
        done: false,
        userId: user.uid,
      });
      setTasks([...tasks, { id: docRef.id, title, description, done }]);
      // console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setAdding(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks(tasks.filter((task) => task.id !== id));
      // console.log(id);
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const updateTask = async (id) => {
    const user = auth.currentUser;
    try {
      const task = tasks.find((task) => task.id === id);
      await updateDoc(doc(db, 'tasks', id), {
        title: task.title,
        description: task.description,
        done: !task.done,
      });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, done: !task.done } : task
        )
      );
      // console.log(id);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        adding,
        loading,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
