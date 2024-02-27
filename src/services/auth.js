const User = require("../models/user")
const bcrypt = require("bcrypt")
class AuthServices {
  create = async (body) => {
    try {
      const user = new User(body);
      const result = await user.save();
      const token = result.generateToken()
      return token
    } catch (error) {
      throw error
    }
  };
  login = async (user) => {
    try {
      const token = await user.generateToken();
      return token
    } catch (error) {
      throw error
    }
  };
}

module.exports = new AuthServices();
