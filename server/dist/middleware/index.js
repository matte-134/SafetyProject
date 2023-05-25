"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const questions_1 = require("../seed/questions");
const models_1 = require("../models");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
class Middleware {
    handleValidationError(req, res, next) {
        const error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.json(error);
        }
        next();
    }
    async populateQuestions(auditId) {
        const questionInstances = await Promise.all(questions_1.auditQuestions.map(async (question) => {
            await models_1.QuestionInstance.create({
                ...question,
                auditId: auditId,
                id: (0, uuid_1.v4)(),
            });
        }));
        return questionInstances;
    }
    async login(user, password) {
        try {
            const [foundUser] = await models_1.UserInstance.findAll({
                where: { username: user },
            });
            if (!foundUser) {
                return "Username not found";
            }
            const isMatch = await bcrypt_1.default.compare(password, foundUser.dataValues.password);
            if (isMatch) {
                return "success";
            }
            else {
                return "failed";
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = new Middleware();
//# sourceMappingURL=index.js.map