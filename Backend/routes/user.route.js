const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/user.controller");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isString()
      .isLength({ min: 3 })
      .withMessage("FistName should contain at least 3 characters."),
    body("fullName.lastName").isString(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 character long"),
    // .isStrongPassword()
    // .withMessage("Password is weak"),
  ],
  userController.registerUser
);
// router.get("/login", userController.loginController);
// router.post("/login", userController.login);
// router.get("/store", userController.storeUser);
// router.post("/store", userController.storeUser);
module.exports = router;
