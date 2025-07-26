from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class Task(BaseModel):
    title: str

class TaskUpdate(BaseModel):
    title: str = None
    completed: bool = None

tasks = []
next_id = 1

@app.get("/tasks")
def get_tasks():
    return tasks

@app.post("/tasks")
def add_task(task: Task):
    global next_id
    new = {"id": next_id, "title": task.title, "completed": False}
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
            if upd.completed is not None:
                t["completed"] = upd.completed
            if upd.title:
                t["title"] = upd.title
            return t
    raise HTTPException(404, "Task not found")
