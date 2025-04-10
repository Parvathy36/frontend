import { useState } from "react";
import { FaTrash, FaEdit, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import "./TaskList.css";

export default function TaskList({ tasks, toggleTask, editTask, deleteTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    editTask(id, editText);
    setEditingId(null);
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`task-item ${task.completed ? "completed" : ""}`}
        >
          <button
            className={`toggle-btn ${task.completed ? "completed-icon" : ""}`}
            onClick={() => toggleTask(task._id, task.completed)}
          >
            {task.completed ? <FaCheckCircle size={20} /> : <FaRegCircle size={20} />}
          </button>

          {editingId === task._id ? (
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />
          ) : (
            <span className={`task-text ${task.completed ? "line-through" : ""}`}>
              {task.text}
            </span>
          )}

          <div className="action-buttons">
            {editingId === task._id ? (
              <button className="action-button save-button" onClick={() => saveEdit(task._id)}>
                <FaCheckCircle size={18} />
              </button>
            ) : (
              <button className="action-button edit-button" onClick={() => startEditing(task._id, task.text)}>
                <FaEdit size={18} />
              </button>
            )}
            <button className="action-button delete-button" onClick={() => deleteTask(task._id)}>
              <FaTrash size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
