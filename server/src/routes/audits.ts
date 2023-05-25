import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { UserInstance, AuditInstance, QuestionInstance } from "../models";
import Middleware from "../middleware";

const auditRoutes = express.Router();

auditRoutes.get("/read", async (req: Request, res: Response) => {
  try {
    const record = await UserInstance.findAll({
      where: { id: req.body.userId },
      include: [
        {
          model: AuditInstance,
          include: [
            {
              model: QuestionInstance,
            },
          ],
        },
      ],
    });
    return res.json(record);
  } catch (error) {
    return res.json({ msg: "Error", status: 500, route: "/read" });
  }
});

auditRoutes.post("/newaudit", async (req: Request, res: Response) => {
  const { userId } = req.body;
  const id = uuidv4();
  const date = new Date();
  console.log(userId);
  try {
    const auditRecord = await AuditInstance.create({ userId, date, id });
    Middleware.populateQuestions(id);
    return res.json({
      record: auditRecord,
      msg: "Success",
    });
  } catch (error) {
    return res.json({ msg: "Error", status: 500, route: "/newaudit" });
  }
});

export default auditRoutes;
