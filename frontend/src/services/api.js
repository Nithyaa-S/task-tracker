const API_URL = 'http://127.0.0.1:8000/tasks';

export const fetchTasks = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createTask = async (task) => {
  task.id = ""; // backend will override this
  task.completed = false;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};

export const toggleTaskStatus = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'PUT' });
};
