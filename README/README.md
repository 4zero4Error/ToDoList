## To Do List project Assignment 8

## Backend - using same concept of lecture and code for assignment 7
controllers: define the main logic for handling requests and responses for tasks
- taskController.js

models: define the data schema for tasks (structure)
- taskModel.js

routes: define the URL paths for tasks
- taskRoutes.js

server.js: the main entry point for the server, where the application is started

npm run dev : to start the server in development mode with nodemon 

## Frontend
components: define the reusable UI elements of the application
- SearchBar.js : to search tasks
- TaskItem.js : to display each task in the list with details
- TaskList.js : to display the list of tasks from the backend   
- TaskForm.js : to create,update,search,delete tasks

context: define the shared state and actions between components
- TaskContext.js : to share the task list and actions between components

hooks: define the custom logic for the application
- useTaskContext.js : to access the task context in components

pages: define the main pages of the application
- home.js : the main page of the application, where the user can view and manage their tasks

app.js: the main entry point for the frontend, where the application is started
index.js: the main entry point for the frontend, where the application is mounted

npm run dev : to start the frontend 

## env- setup for the application
- .env : to store the environment variables for the application, such as the database connection string, the port number, etc.
MONGODB_URI : the connection string for the MongoDB database
app_name : the name of the application, used in the database connection string



## Database
- tasks : the collection in the MongoDB database where the task documents are stored


## Challenges 
- localStorage : to store the task list in the browser's local storage
- axios : to make HTTP requests to the backend API
- search tasks : to search tasks in the list
- render tasks : to render the tasks in the list
