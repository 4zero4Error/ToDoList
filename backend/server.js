const tasks = require("./routes/task");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // cross-origin resource sharing new concept got to know 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "To-Do API is running",
  });
});

app.use("/api/tasks", tasks);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
});
 
 