import React from "react";
import { useTaskContext } from "../hooks/UseTaskContext";

const TaskDetail = ({ task }) => {
  const { dispatch } = useTaskContext();
  const handleDelete = async () => {
    const response = await fetch(`/api/tasks/${task._id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: task._id });
    }
  };
  return (
    <div>
      <h3>Task Detail</h3>
      <p>Title: {task.title}</p>
      <p>Description: {task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Created At: {task.createdAt}</p>
      <p>Updated At: {task.updatedAt}</p>
      <span onClick={handleDelete} style={{ cursor: "pointer", color: "red" }}>
        Delete
      </span>
    </div>
  );
};

export default TaskDetail;