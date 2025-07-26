import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:8000/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await axios.post("http://localhost:8000/tasks", { title: newTask });
    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/tasks/${id}`);
    fetchTasks();
  };

  const toggleTask = async (id, completed) => {
    await axios.put(`http://localhost:8000/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-indigo-700">🌟 Task Manager</h1>
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
      </div>
    </div>
  );
}
import './index.css'; // Ensure Tailwind CSS is imported