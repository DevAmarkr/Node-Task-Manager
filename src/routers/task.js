const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/task");

router.get("/", TaskController.createTask);
router.get("/history", TaskController.createTask);
router.post("/create", TaskController.createTask);
router.patch("/update", TaskController.createTask);

module.exports = router;
