const Task = require('../models/taskmodel');
const mongoose = require('mongoose');

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({
            message: "Tasks fetched successfully",
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching tasks",
            error: error.message,
        });
    }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid task ID",
        });
    }
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        res.status(200).json({
            message: "Task fetched successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching task",
            error: error.message,
        });
    }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description = "", status, dueDate = null } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid task ID",
        });
    }

    if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            message: "Title is required",
        });
    }

    if (!["pending", "completed"].includes(status)) {
        return res.status(400).json({
            message: "Status must be either pending or completed",
        });
    }

    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { title: title.trim(), description, status, dueDate },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.status(200).json({
            message: "Task updated successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating task",
            error: error.message,
        });
    }
};      

//Create a new task
exports.createTask = async (req, res) => {
    const { title, description = "", status = "pending", dueDate = null } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            message: "Title is required",
        });
    }

    if (!["pending", "completed"].includes(status)) {
        return res.status(400).json({
            message: "Status must be either pending or completed",
        });
    }

    try {
        const newTask = new Task({ title: title.trim(), description, status, dueDate });
        await newTask.save(); // new concept of saving the task to the database using mongoose built in logic
        res.status(201).json({
            message: "Task created successfully",
            task: newTask,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating task",
            error: error.message,
        });
    }

};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid task ID",
        });
    }

    try {
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.status(200).json({
            message: "Task deleted successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting task",
            error: error.message,
        });
    }
};