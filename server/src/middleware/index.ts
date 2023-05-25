import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { auditQuestions } from "../seed/questions";
import { QuestionInstance, UserInstance } from "../models";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

class Middleware {
  handleValidationError(req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json(error);
    }
    next();
  }
  async populateQuestions(auditId: string) {
    const questionInstances = await Promise.all(
      auditQuestions.map(async (question) => {
        await QuestionInstance.create({
          ...question,
          auditId: auditId,
          id: uuidv4(),
        });
      })
    );
    return questionInstances;
  }
  async login(user: string, password: string) {
    try {
      const [foundUser] = await UserInstance.findAll({
        where: { username: user },
      });
      if (!foundUser) {
        return "Username not found";
      }
      const isMatch = await bcrypt.compare(
        password,
        foundUser.dataValues.password
      );
      if (isMatch) {
        return "success";
      } else {
        return "failed";
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new Middleware();
