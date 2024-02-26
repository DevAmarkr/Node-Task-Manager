const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME,
    });
    console.log("Database connected!!");
  } catch (error) {
    console.log("Database not connected");
  }
};
