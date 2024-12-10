const userModel = require("../models/user.model");

const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });
  try {
    const {
      fullName: { firstName, lastName },
      email,
      password,
    } = req.body;
    const userExist = await userModel.findOne({ email });
    const hashPassword = await userModel.hashPassword(password);
    if (userExist) {
      return res.status(400).json({ message: `${email} already registered` });
    }

    const user = await userService.createrUser({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    const token = user.generateAuthToken();
    return res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};
