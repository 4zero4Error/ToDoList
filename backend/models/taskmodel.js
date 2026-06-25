const mongoose = require('mongoose');
const schema = mongoose.Schema;
// to create a new task  with the title, description, status, and dueDate in the request body. 
// The title is required and must be a non-empty string. 
// The status must be either "pending" or "completed". 
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        default: null
    }
}, { timestamps: true });

// taskschema will stored in the database as a collection named "tasks" and each document in that collection will have the fields defined in the schema. 
// The timestamps option will automatically add createdAt and updatedAt fields to each document, which will store the date and time when the document was created and last updated, respectively.
module.exports = mongoose.model('Task', taskSchema);
