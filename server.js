const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const queueManager = require("./services/queueManager");
const workerManager = require("./services/workerManager");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/yourdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/auth", authRoutes);

app.post("/task", authMiddleware, async (req, res) => {
  const { task } = req.body;
  await queueManager.addTask(req.user._id, task);
  workerManager.startWorker(req.user._id);
  res.status(201).json({ message: "Task added to the queue" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
