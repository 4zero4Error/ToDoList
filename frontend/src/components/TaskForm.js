import { useState } from "react";
import React from "react";
import { useTaskContext } from "../hooks/UseTaskContext";

const TaskForm = () => {
  const { dispatch } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const newTask = {
      _id: Date.now().toString(),
      title,
      description,
      status,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    // Try to save to backend first
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "CREATE_TASK", payload: data });
      } else {
        // If backend fails, 
        dispatch({ type: "CREATE_TASK", payload: newTask });
      }
    } catch (err) {
      // If backend not reachable
      console.log("Backend not running");
      dispatch({ type: "CREATE_TASK", payload: newTask });
    }

    // Clear form
    setTitle("");
    setDescription("");
    setStatus("pending");
    setDueDate("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Add Task</h3>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button>Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskForm;
