from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class Task(BaseModel):
    title: str
    description: Optional[str] = ""
    completed: Optional[bool] = False
    priority: Optional[str] = "Medium"
    dueDate: Optional[str] = ""

class TaskUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    completed: Optional[bool]
    priority: Optional[str]
    dueDate: Optional[str]

tasks = []
next_id = 1

@app.get("/tasks")
def get_tasks():
    return tasks

@app.post("/tasks")
def add_task(task: Task):
    global next_id
    new = {
        "id": next_id,
        "title": task.title,
        "description": task.description,
        "completed": task.completed,
        "priority": task.priority,
        "dueDate": task.dueDate
    }
    tasks.append(new)
    next_id += 1
    return new

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return {"message": "Deleted"}

@app.put("/tasks/{task_id}")
def update_task(task_id: int, upd: TaskUpdate):
    for t in tasks:
        if t["id"] == task_id:
            if upd.title is not None: t["title"] = upd.title
            if upd.description is not None: t["description"] = upd.description
            if upd.completed is not None: t["completed"] = upd.completed
            if upd.priority is not None: t["priority"] = upd.priority
            if upd.dueDate is not None: t["dueDate"] = upd.dueDate
            return t
    raise HTTPException(404, "Task not found")
