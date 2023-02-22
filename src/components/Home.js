import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/Task/TaskForm';
import TaskList from './Task/TaskList';

export function Home() {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='w-full flex flex-col'>
      <div className='bg-zinc-800 md:flex justify-between p-4'>
        <p className='text-xl mb-4 text-white'>
          Welcome {user.displayName || user.email}
        </p>
        <button
          className='bg-rose-500 hover:bg-rose-700 rounded py-2 px-4 text-white mx-auto text'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className='flex flex-col mt-5 md:flex-row'>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}
