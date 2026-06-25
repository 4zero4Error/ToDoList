import React, { createContext, useReducer, useEffect } from "react";

const TaskContext = createContext();

// Load tasks from localStorage as on refresh the task gets wipped out but still exists in localStorage so we need to load it from localStorage lil bit from last lecture and lil AI documentation 
const loadTasksFromStorage = () => {
  try {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    return [];
  }
};

// Save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
};

const TaskReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case "SET_TASKS":
      newState = { tasks: action.payload };
      break;
    case "CREATE_TASK":
      newState = { tasks: [...state.tasks, action.payload] };
      break;
    case "DELETE_TASK":
      newState = { tasks: state.tasks.filter(task => task._id !== action.payload) };
      break;
    case "EDIT_TASK":
      newState = {
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        )
      };
      break;
    default:
      newState = state;
  }
  
  // Save to localStorage on every change
  if (newState.tasks !== undefined) {
    saveTasksToStorage(newState.tasks);
  }
  
  return newState;
};

const TaskContextProvider = ({ children }) => {
  // Initialize with tasks from localStorage
  const [state, dispatch] = useReducer(TaskReducer, { tasks: loadTasksFromStorage() });
  
  // Try to fetch from backend on initial load
  useEffect(() => {
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
  }, []);

  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskContextProvider };
export default TaskContext;
