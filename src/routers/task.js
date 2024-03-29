const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/task");
const { isValidUser, validateTaskPayload } = require("../middlewares");


router.get("/", isValidUser, TaskController.getTask);
router.post("/create", isValidUser, validateTaskPayload, TaskController.createTask);
router.patch("/update-status/:taskId", isValidUser, TaskController.updateTaskStatus);
router.patch("/modify/:taskId", isValidUser, TaskController.updateTasks);
router.delete("/delete/:taskId", isValidUser, TaskController.deleteTask);



module.exports = router;
