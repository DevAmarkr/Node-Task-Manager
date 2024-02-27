const { default: mongoose } = require("mongoose");
const Task = require("../models/task")

class TaskServices {
  create = async (body) => {
    try {
      let response = await Task.create(body)
      return response
    } catch (error) {
      console.log("ERROR", error)
    }
  };
  getUserTasks = async (userId) => {
    try {
      let response = await Task.find({ owner_id: (userId) })
      return response
    } catch (error) {
      console.log("ERROR", error)
    }
  };
  updateStatus = async (body, taskId) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate({ _id: taskId }, { completed: body.status }, { new: true });
      return updatedTask
    } catch (error) {
      console.log("ERROR", error)
    }
  };
  modify = async (body, taskId) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate({ _id: taskId }, { ...body }, { new: true });
      return updatedTask
    } catch (error) {
      console.log("ERROR", error.message)
    }
  };
  delete = async (taskId) => {
    try {
      const updatedTask = await Task.findByIdAndDelete({ _id: taskId });
      return updatedTask
    } catch (error) {
      console.log("ERROR", error.message)
    }
  };
}

module.exports = new TaskServices();
