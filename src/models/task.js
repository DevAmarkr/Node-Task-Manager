const mongoose = require("mongoose");
const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
const schema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  completed: {
    type: "boolean",
    default: false,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
}, schemaOptions);

const Task = mongoose.model("Task", schema);
module.exports = Task;
