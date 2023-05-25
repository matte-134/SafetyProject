"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class UserValidator {
    checkCreateUser() {
        return [
            (0, express_validator_1.body)("username").notEmpty().withMessage("Name is required"),
            (0, express_validator_1.body)("email").isEmail().withMessage("Email is required"),
            (0, express_validator_1.body)("password")
                .isLength({ min: 6 })
                .withMessage("Password must be at least 6 characters long"),
        ];
    }
}
exports.default = new UserValidator();
//# sourceMappingURL=index.js.map