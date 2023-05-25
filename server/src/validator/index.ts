import { body } from "express-validator";
import { UserInstance } from "../models";

class UserValidator {
  checkCreateUser() {
    return [
      body("username").notEmpty().withMessage("Name is required"),

      body("email").isEmail().withMessage("Email is required"),

      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ];
  }
}

export default new UserValidator();
