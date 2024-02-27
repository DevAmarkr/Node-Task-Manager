const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    default: false,
  },
  token: {
    type: String,
  },
}, schemaOptions);

schema.pre("save", function (next) {
  const user = this;
  if (this.isNew && !this.isModified(this.password)) {
    this.createdAt = this.updatedAt = Date.now();
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  }
  next();
});

schema.methods.generateToken = function () {
  const user = this;
  const payload = {
    userId: this._id,
  };
  const jwtToken = jwt.sign(payload, process.env.SEC_TOK, { expiresIn: process.env.EXP_IN });
  user.token = jwtToken
  user.save().then(() => {
    return jwtToken;
  });
  return jwtToken;
};


const User = mongoose.model("User", schema);
module.exports = User;
