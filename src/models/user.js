const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
    default: false,
  },
});

const User = mongoose.model("User", schema);
module.exports = User;
