const { default: mongoose } = require("mongoose");
const Task = require("../models/task")

class TaskServices {
  create = async (body) => {
    try {
      let response = await Task.create(body)
      return response
    } catch (error) {
      throw error
    }
  };
  getUserTasks = async (userId) => {
    try {
      let response = await Task.find({ owner_id: (userId) })
      return response
    } catch (error) {
      throw error
    }
  };
  updateStatus = async (body, taskId) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate({ _id: taskId }, { completed: body.status }, { new: true });
      return updatedTask
    } catch (error) {
      throw error
    }
  };
  modify = async (body, taskId) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate({ _id: taskId }, { ...body }, { new: true });
      return updatedTask
    } catch (error) {
      throw error
    }
  };
  delete = async (taskId) => {
    try {
      const updatedTask = await Task.findByIdAndDelete({ _id: taskId });
      return updatedTask
    } catch (error) {
      throw error
    }
  };
}

module.exports = new TaskServices();
