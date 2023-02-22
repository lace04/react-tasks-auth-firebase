import { useTasks } from '../../context/TasksContext';

function TaskCard({ task }) {
  const { deleteTask, updateTask } = useTasks();

  const handleDelete = () => {
    try {
      deleteTask(task.id);
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const handleToggleDone = () => {
    try {
      updateTask(task.id);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <div className='bg-zinc-800 m-2 p-4 rounded w-1/2 md:min-w-[150px] mx-auto'>
      <h3 className='text-teal-700 text-3xl'>{task.title}</h3>
      <p className='text-teal-100 text-xl'>{task.description}</p>
      <p className='text-teal-100 text-xl'>{JSON.stringify(task.done)}</p>
      <div>
        <button onClick={() => handleDelete()} className='bg-red-500 hover:bg-red-400 rounded-sm text-sm mr-4 px-2 py-1'>Delete</button>
        <button onClick={() => handleToggleDone()} className='bg-teal-800 hover:bg-teal-700 rounded-sm text-sm px-1 py-1'>Done</button>
      </div>
    </div>
  );
}

export default TaskCard;
