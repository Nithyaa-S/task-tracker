import React from "react";

const TaskList = ({ tasks, onDelete, onToggle }) => (
  <ul className="space-y-3">
    {tasks.length === 0 ? (
      <p className="text-center text-gray-500">No tasks found.</p>
    ) : (
      tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow-sm"
        >
          <span className={`flex-1 ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
            {task.title}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggle(task.id, task.completed)}
              className="text-green-600 hover:text-green-800"
            >
              {task.completed ? "Undo" : "Done"}
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </li>
      ))
    )}
  </ul>
);

export default TaskList;
