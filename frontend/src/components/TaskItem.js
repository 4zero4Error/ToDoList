import React, { useState } from "react";
import { useTaskContext } from "../hooks/UseTaskContext";
//added in another file cause facing render issue while editing task 
const TaskItem = ({ task }) => {
  const { dispatch } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editStatus, setEditStatus] = useState(task.status);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/tasks/${task._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch({ type: "DELETE_TASK", payload: task._id });
      } else {
        // If backend fails, still update UI
        dispatch({ type: "DELETE_TASK", payload: task._id });
      }
    } catch (err) {
      // If backend not reachable, still update UI
      dispatch({ type: "DELETE_TASK", payload: task._id });
    }
  };

  const handleSaveEdit = async () => {
    const updatedTask = {
      ...task,
      title: editTitle,
      description: editDescription,
      status: editStatus,
      dueDate: editDueDate || null,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    try {
      const response = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "EDIT_TASK", payload: data });
      } else {
        dispatch({ type: "EDIT_TASK", payload: updatedTask });
      }
    } catch (err) {
      dispatch({ type: "EDIT_TASK", payload: updatedTask });
    }

    setIsEditing(false);
  };
  // to handle the editing of a task
  if (isEditing) {
    return (
      <div className="task-item edit-mode">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
          />
        </div>
        <div className="task-actions">
          <button className="save-btn" onClick={handleSaveEdit}>Save</button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-item">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: <span className={`status ${task.status}`}>{task.status}</span></p>
      <p>Due Date: {task.dueDate ? task.dueDate : "N/A"}</p>
      <div className="task-actions">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
