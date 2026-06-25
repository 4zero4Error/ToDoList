const express = require("express");
const router = express.Router();
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require("../controllers/taskcontroller");


// to create a new task  with the title, description, status, and dueDate in the request body.
// The title is required and must be a non-empty string. 
// The status must be either "pending" or "completed". 

router.post("/", createTask); // slash imp line mounted one 

  
// to get all tasks or a specific task by its ID.
router.get("/", getAllTasks);

// to get a specific task by its ID.
router.get("/:id", getTaskById);

// to update an existing task by its ID. 
router.put("/:id", updateTask);

// to delete a task by its ID.
router.delete("/:id", deleteTask);

module.exports = router; // to export the router object
  

