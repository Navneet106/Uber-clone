const userModel = require("../models/user.model");

module.exports.createrUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All Fields are all required");
  }
  try {
    const user = await userModel.create({
      fullName: { firstName, lastName },
      email,
      password,
    });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};
