import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./index.css"; 

const API_URL = "https://todo-backend-ffe6.onrender.com/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (text) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('Failed to add task');
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error adding task:', err);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      const updatedTask = await res.json();
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating task:', err);
    }
  };

  const editTask = async (id, text) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      const updatedTask = await res.json();
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter(task => task._id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting task:', err);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>Todo List</h1>
          <p>Stay organized and productive</p>
        </div>

        {error && (
          <div className="error-box">
            <p>{error}</p>
          </div>
        )}

        <div className="task-input">
          <TaskInput addTask={addTask} />
        </div>

        <div className="task-list">
          <TaskList tasks={tasks} toggleTask={toggleTask} editTask={editTask} deleteTask={deleteTask} />
        </div>
      </div>
    </div>
  );
}
