const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");
const { validateAuthPayload, validateLoginPayload } = require("../middlewares");

router.post("/registration", validateAuthPayload, AuthController.register);
router.post("/login", validateLoginPayload, AuthController.login);

module.exports = router;
