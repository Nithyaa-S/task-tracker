import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask, toggleTaskStatus } from '../services/api';

const filters = ['All', 'Pending', 'Done'];

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sortKey, setSortKey] = useState('dueDate');

  useEffect(() => { fetchTasks().then(setTasks); }, []);

  const load = () => fetchTasks().then(setTasks);

  const filtered = tasks.filter((t) => {
    if (filter === 'All') return true;
    return filter === 'Done' ? t.completed : !t.completed;
  });

  filtered.sort((a, b) => {
    if (sortKey === 'priority') {
      const order = { High: 0, Medium: 1, Low: 2 };
      return order[a.priority] - order[b.priority];
    } else if (sortKey === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  const total = tasks.length;
  const doneCount = tasks.filter((t) => t.completed).length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="text-gray-700 font-medium">Total: {total} | Done: {doneCount}</div>
        <div className="space-x-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              } hover:scale-105 transition`}
            >
              {f}
            </button>
          ))}
        </div>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="p-2 rounded-md border border-gray-300"
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <li
            key={t.id}
            className={`p-4 rounded-xl border shadow-sm transition ${
              t.completed ? 'bg-green-50' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className={`font-semibold text-lg ${t.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {t.title}
              </h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                t.priority === 'High'
                  ? 'bg-red-100 text-red-700'
                  : t.priority === 'Medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'}`}>
                {t.priority || 'Medium'}
              </span>
            </div>
            {t.description && <p className="text-sm text-gray-600 mb-1">{t.description}</p>}
            <p className="text-xs text-gray-500 mb-3">Due: {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'N/A'}</p>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTaskStatus(t.id).then(load)}
                className={`px-3 py-1 rounded ${
                  t.completed ? 'bg-yellow-500' : 'bg-blue-600'
                } text-white hover:opacity-90 transition`}
              >
                {t.completed ? 'Undo' : 'Mark Done'}
              </button>
              <button
                onClick={() => deleteTask(t.id).then(load)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:opacity-90 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
