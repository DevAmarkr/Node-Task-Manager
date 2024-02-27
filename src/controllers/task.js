const TaskServices = require("../services/task");

class TaskController {
  createTask = async (req, res) => {
    try {
      req.body.owner_id = req.userId
      let result = await TaskServices.create(req.body);
      res.send({
        message: "OK",
        status: 201,
        data: result,
      });
    } catch (error) {
      res.send({
        message: "Something went wrong",
        status: 500,
        data: error,
      });
    }
  };
  getTask = async (req, res) => {
    try {
      let result = await TaskServices.getUserTasks(req.userId);
      res.send({
        message: "OK",
        status: 200,
        data: result,
      });
    } catch (error) {
      res.send({
        message: "Something went wrong",
        status: 500,
        data: error,
      });
    }
  };
  updateTaskStatus = async (req, res) => {
    try {
      const body = req?.body
      const taskId = req?.params?.taskId
      if (!taskId) {
        res.send({
          message: "taskId Missing",
          status: 400,
        })
      }
      const result = await TaskServices.updateStatus(body, taskId);
      res.send({
        message: "OK",
        status: 201,
        data: result,
      });
    } catch (error) {
      res.send({
        message: "Something went wrong",
        status: 500,
        data: error,
      });
    }
  };
  updateTasks = async (req, res) => {
    try {
      let body = req.body
      let taskId = req?.params?.taskId
      if (!taskId) {
        res.send({
          message: "taskId Missing",
          status: 400,
        })
      }
      let result = await TaskServices.modify(body, taskId);
      res.send({
        message: "Updated",
        status: 201,
        data: result,
      });
    } catch (error) {
      res.send({
        message: "Something went wrong",
        status: 500,
        data: error,
      });
    }
  };
  deleteTask = async (req, res) => {
    try {
      let taskId = req?.params?.taskId
      if (!taskId) {
        res.send({
          message: "taskId Missing",
          status: 400,
        })
      }
      let result = await TaskServices.delete(taskId);
      res.send({
        message: "Task Deleted",
        status: 200,
        data: result,
      });
    } catch (error) {
      res.send({
        message: "Something went wrong",
        status: 500,
        data: error,
      });
    }
  };
}

module.exports = new TaskController();
