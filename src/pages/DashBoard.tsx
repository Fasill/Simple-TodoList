import { useEffect, useState } from "react";

interface Task {
  id: number;
  description: string;
}

const DashBoard = () => {
  const [lastId, setLastId] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTaskVal, setEditTaskVal] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  

  const addTask = (task: string) => {
    if (task.trim() === "") return; // Prevent adding empty tasks

    const newTask = { id: lastId + 1, description: task };
    setTasks([...tasks, newTask]);
    setNewTask("");
    setLastId(lastId + 1);
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setEditTaskVal(task.description);
  };

  const editTask = () => {
    if (editingTask) {
      const updatedTasks = tasks.map(task =>
        task.id === editingTask.id ? { ...task, description: editTaskVal } : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setEditTaskVal("");
    }
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex items-center justify-center h-[100lvh]">

        <div className="p-4">
        <header className="bg-gray-800 border-b-4 border-red-400 text-white text-3xl p-4">
            What To Do
        </header>
        <div className="my-4">
            <input
            className="border border-red-400 p-2 mr-2"
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            />
            <button
            className="border border-red-400 p-2 bg-red-400 text-white"
            onClick={() => addTask(newTask)}
            >
            Add
            </button>
        </div>
        <div>
            {tasks.map((task) => (
            <div key={task.id} className="border border-red-400 p-2 mb-2">
                <div className="flex items-center justify-between">
                {editingTask && editingTask.id === task.id ? (
                    <>
                    <input
                        value={editTaskVal}
                        onChange={(e) => setEditTaskVal(e.target.value)}
                        className="border border-red-400 p-2 mr-2"
                    />
                    <button
                        className="border border-red-400 p-2 mr-2 bg-green-400 text-white"
                        onClick={editTask}
                    >
                        Save
                    </button>
                    <button
                        className="border border-red-400 p-2 bg-gray-400 text-white"
                        onClick={() => setEditingTask(null)}
                    >
                        Cancel
                    </button>
                    </>
                ) : (
                    <>
                    <div>{task.description}</div>
                    <div>
                        <button
                        className="border border-red-400 p-2 mr-2"
                        onClick={() => startEditing(task)}
                        >
                        Edit
                        </button>
                        <button
                        className="border border-red-400 p-2 bg-red-400 text-white"
                        onClick={() => deleteTask(task.id)}
                        >
                        Delete
                        </button>
                    </div>
                    </>
                )}
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default DashBoard;
