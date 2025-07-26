import React, { useState } from 'react';
import { createTask } from '../services/api';

const priorities = [
  { label: 'High', color: 'bg-red-500' },
  { label: 'Medium', color: 'bg-yellow-500' },
  { label: 'Low', color: 'bg-green-500' },
];

const TaskForm = ({ onAdded }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask({ title, completed: false, priority, dueDate });
    setTitle(''); setPriority('Medium'); setDueDate('');
    onAdded();
  };

  return (
    <form onSubmit={submit} className="flex flex-wrap gap-3 mb-6">
      <input
        type="text"
        placeholder="Enter a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-3 rounded-lg border focus:ring-2 focus:ring-blue-400 transition"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
      >
        {priorities.map((p) => (
          <option key={p.label} value={p.label}>{p.label}</option>
        ))}
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
      />
      <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
        Add
      </button>
    </form>
  );
};

export default TaskForm;
