const TaskServices = require("../services/task");

class TaskController {
  createTask = async (req, res) => {
    try {
      let result = TaskService.create(req.body);
      res.send({
        message: "OK",
        status: 201,
        data: result,
      });
    } catch (error) {
      res.send({
        message: "Failed",
        status: 500,
        data: error,
      });
    }
  };
  getTask = async (req, res) => {
    try {
      let result = TaskService.create(req.body);
      res.send({
        message: "OK",
        status: 200,
        data: result,
      });
    } catch (error) {
      res.send({
        message: "Failed",
        status: 500,
        data: error,
      });
    }
  };
  getTaskHistory = async (req, res) => {
    try {
      let result = TaskService.create(req.body);
      res.send({
        message: "OK",
        status: 200,
        data: result,
      });
    } catch (error) {
      res.send({
        message: "Failed",
        status: 500,
        data: error,
      });
    }
  };
  changeTaskStatus = async (req, res) => {
    try {
      let result = TaskService.create(req.body);
      res.send({
        message: "OK",
        status: 201,
        data: result,
      });
    } catch (error) {
      res.send({
        message: "Failed",
        status: 500,
        data: error,
      });
    }
  };
  updateTasks = async (req, res) => {
    try {
      let result = TaskService.create(req.body);
      res.send({
        message: "OK",
        status: 201,
        data: result,
      });
    } catch (error) {
      res.send({
        message: "Failed",
        status: 500,
        data: error,
      });
    }
  };
  deleteTask = async (req, res) => {
    try {
      let result = TaskService.create(req.body);
      res.send({
        message: "OK",
        status: 200,
        data: result,
      });
    } catch (error) {
      res.send({
        message: "Failed",
        status: 500,
        data: error,
      });
    }
  };
}

module.exports = new TaskController();
