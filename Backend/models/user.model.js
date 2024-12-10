const mongoose = require("mongoose");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLenght: [3, "the first name should be at least 3 characters "],
      required: true,
    },
    lastName: {
      required: true,
      type: String,
      minLenght: [3, "the last name should be at least 3 characters "],
    },
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false, // Add so that if we search or parse the user schema, the password would not come
  },
  socketId: {
    type: String,
  },
});
// lets add method
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET_KEY);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return bcyrpt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function (password) {
  const salt = await bcyrpt.genSalt(10);
  return bcyrpt.hash(password, salt);
};
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
