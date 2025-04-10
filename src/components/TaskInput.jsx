import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./TaskInput.css"; // Import the CSS file

export default function TaskInput({ addTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="task-input"
      />
      <button
        type="submit"
        className={`task-button ${text.trim() ? "active" : "disabled"}`}
        disabled={!text.trim()}
      >
        <FaPlus size={18} />
      </button>
    </form>
  );
}
