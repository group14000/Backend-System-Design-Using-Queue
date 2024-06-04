const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  tasks: { type: [String], default: [] },
});

module.exports = mongoose.model("Queue", QueueSchema);
