import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [refresh, setRefresh] = React.useState(0);
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 shadow-xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">📋 Task Tracker</h1>
        <TaskForm onAdded={() => setRefresh((r) => r + 1)} />
        <TaskList key={refresh} />
      </div>
    </div>
  );
}

export default App;
