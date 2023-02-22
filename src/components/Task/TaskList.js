import { useEffect } from 'react';
import { useTasks } from '../../context/TasksContext';
import TaskCard from './TaskCard';

function TaskList() {
  const { tasks, getTasks, loading } = useTasks();

  useEffect(() => {
    getTasks(true);
  }, []);

  function renderTask() {
    if (loading) {
      return <div className='text-white text-3xl'>Loading...</div>;
    } else if (tasks.length === 0) {
      return <div className='text-white text-3xl'>No tasks Found</div>;
    } else {
      return (
        <div className='text-white grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      );
    }
  }

  return <div>{renderTask()}</div>;
}

export default TaskList;
