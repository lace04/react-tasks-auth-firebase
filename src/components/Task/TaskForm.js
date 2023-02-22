import { useState } from 'react';
import { useTasks } from '../../context/TasksContext';
import { useAuth } from '../../context/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { v4 as uuid } from 'uuid';

function TaskForm() {
  const { logout, user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { createTask, adding } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTask(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <div className='ml-12 mr-12'>
      <h1 className='text-2xl text-center'>Create New Task</h1>
      <form onSubmit={handleSubmit} className='flex flex-col w-48  text-black mx-auto mb-8'>
        <input
          type='text'
          name='title'
          placeholder='Write a title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className='mt-2'
        />
        <textarea
          name='description'
          placeholder='Write a description'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='mt-2'
        />
        <button type='submit' className='text-white bg-teal-700 mt-2 px-3 py-2 rounded ' disabled={adding}>
          {adding ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
