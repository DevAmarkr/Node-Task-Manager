const AuthServices = require("../services/auth");
const User = require("../models/user")
const bcrypt = require("bcrypt")
class AuthController {
  register = async (req, res) => {
    try {
      let result = await AuthServices.create(req.body);
      res.send({
        message: "Successfully Registered",
        status: 201,
        token: result,
      });
    } catch (error) {
      res.send({
        message: "Something went wrong",
        status: 500,
        data: error,
      });
    }
  };
  login = async (req, res) => {
    try {
      let verifyPassword;
      const user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        verifyPassword = await bcrypt.compareSync(
          req.body.password,
          user.password
        );
      }
      if (user && verifyPassword) {
        let result = await AuthServices.login(user);
        res.send({
          message: "Successfully LoggedIn",
          status: 200,
          data: result,
        });
      } else {
        res.send({
          message: "User Not found : Login Failed",
          status: 404
        });
      }

    } catch (error) {
      res.send({
        message: "Something went wrong",
        status: 500,
        data: error,
      });
    }
  };
}

module.exports = new AuthController();
