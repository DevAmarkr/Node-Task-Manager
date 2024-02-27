const jwt = require("jsonwebtoken")


module.exports = {
  isValidUser: (req, res, next) => {
    try {
      const bearerToken = req.headers.auth;
      if (bearerToken) {
        req.token = bearerToken;
        const decodeToken = jwt.verify(req.token, process.env.SEC_TOK);
        req.userId = decodeToken.userId;
        next();
      } else {
        res.status(401).send({
          message: "UnAuthorized : Access Denied",
          status: 401
        })
      }
    } catch (error) {
      res.status(500).send({
        message: error.message === "invalid signature" ? "Invalid Token" : error.message,
        status: 500
      })
    }
  }
}