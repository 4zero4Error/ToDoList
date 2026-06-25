import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";
import TaskItem from "../components/TaskItem";
import SearchBar from "../components/SearchBar";
import React from "react";
import { useTaskContext } from "../hooks/UseTaskContext";

const Home = () => {
  const { tasks, dispatch } = useTaskContext();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Try to fetch from backend
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: "SET_TASKS", payload: data });
        }
      } catch (error) {
        console.log("Backend not available, using localStorage tasks", error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="home">
        <div>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="tasks">
            {filteredTasks && filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskItem key={task._id} task={task} />
              ))
            ) : (
              <div className="task-item">
                <h2>{searchQuery ? "No tasks found" : "No tasks yet!"}</h2>
                <p>{searchQuery ? "Try a different search term" : "Add your first task using the form on the right."}</p>
              </div>
            )}
          </div>
        </div>
        <TaskForm />
      </div>
    </>
  );
};

export default Home;
