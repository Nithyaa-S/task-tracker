# 📝 Task Tracker

A full-stack **Task Management Application** built using **React.js**, **Tailwind CSS**, and **FastAPI**. This app lets users manage their daily tasks with priority, due dates, and completion tracking — all in a sleek, responsive UI.

## 🚀 Features

* ✅ Add, delete, and mark tasks as completed
* 🏷️ Set **priority levels** (High, Medium, Low)
* 📅 Assign **due dates**
* 📊 Filter by status (All, Pending, Done)
* 🔀 Sort tasks by due date or priority
* 💻 Fully responsive modern UI using Tailwind CSS
* 🔄 Real-time updates with FastAPI backend

## 🧑‍💻 Technologies Used

### Frontend

* React.js (with hooks)
* Tailwind CSS
* Axios (API requests)
* Vite (for lightning-fast builds)

### Backend

* FastAPI (Python)
* CORS Middleware
* Pydantic (data validation)

## 🗄️ UI Preview


<img width="926" height="902" alt="image" src="https://github.com/user-attachments/assets/37a1778b-58f2-4965-8ff6-9f39c09fa0af" />

## 📂 Folder Structure

```
task-tracker/
├── backend/
│   └── main.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTask.jsx
│   │   │   └── TaskList.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── index.css
└── README.md
```

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Nithyaa-S/task-tracker.git
cd task-tracker
```

---

### 2. Backend Setup (FastAPI)

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

---

### 3. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| GET    | `/tasks`      | Fetch all tasks    |
| POST   | `/tasks`      | Add a new task     |
| PUT    | `/tasks/{id}` | Update task status |
| DELETE | `/tasks/{id}` | Delete a task      |

---
