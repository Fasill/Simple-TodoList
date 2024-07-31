// LandingPage.tsx
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const goToTodo = () => {
    navigate('/todo');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the To-Do List App</h1>
      <p className="text-lg mb-8">Manage your tasks effectively with our simple and intuitive to-do list application.</p>
      <button
        className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
        onClick={goToTodo}
      >
        Go to To-Do List
      </button>
    </div>
  );
};

export default LandingPage;
