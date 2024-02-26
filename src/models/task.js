const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  description: {
    type: "string",
    required: true,
  },
  completed: {
    type: "boolean",
    required: true,
    default: false,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Task = mongoose.model("Task", schema);
module.exports = Task;
