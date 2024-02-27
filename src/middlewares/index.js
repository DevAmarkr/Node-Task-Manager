const jwt = require("jsonwebtoken")
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");
const User = require("../models/user")
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
  },
  validateAuthPayload: async (req, res, next) => {
    try {
      const isUser = await User.findOne({ email: req.body.email })
      if (isUser?.email) {
        res.send({
          message: "This email ID is already present",
          status: 400,
        })
      } else {
        const complexityOptions = {
          min: 5,
          max: 12,
          lowerCase: 1,
          upperCase: 1,
          numeric: 1,
          symbol: 1,
          requirementCount: 4,
        }
        const joiSchema = Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: passwordComplexity(complexityOptions).required()
        })
        await joiSchema.validateAsync(req.body)
        next()
      }

    } catch (error) {
      res.send({
        message: "Validation Failed",
        status: 400,
        error: error.message
      })
    }
  },
  validateLoginPayload: async (req, res, next) => {
    try {
      const isUser = await User.findOne({ email: req.body.email })
      if (!isUser?.email) {
        res.send({
          message: "This email-ID not found",
          status: 404,
        })
      } else {
        const complexityOptions = {
          min: 5,
          max: 12,
          lowerCase: 1,
          upperCase: 1,
          numeric: 1,
          symbol: 1,
          requirementCount: 4,
        }
        const joiSchema = Joi.object().keys({
          email: Joi.string().email().required(),
          password: passwordComplexity(complexityOptions).required()
        })
        await joiSchema.validateAsync(req.body)
        next()
      }

    } catch (error) {
      res.send({
        message: "Validation Failed",
        status: 400,
        error: error.message
      })
    }
  },
  validateTaskPayload: async (req, res, next) => {
    try {
      const joiSchema = Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required()
      })
      await joiSchema.validateAsync(req.body)
      next()
    } catch (error) {
      res.send({
        message: "Validation Failed",
        status: 400,
        error: error.message
      })
    }
  }
}