import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { AuditInstance, QuestionInstance, UserInstance } from "../models";
import UserValidator from "../validator/";
import Middleware from "../middleware";
import { hash } from "bcrypt";

const userRoutes = express.Router();

userRoutes.post(
  "/create",
  UserValidator.checkCreateUser(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    const id = uuidv4();
    try {
      const hashedPw = await hash(req.body.password, 10);
      const record = await UserInstance.create({
        username: req.body.username,
        email: req.body.email,
        position: req.body.position,
        password: hashedPw,
        id,
      });
      return res.json({ record, msg: "Success" });
    } catch (error) {
      return res.json({ msg: "Error", status: 500, route: "/create" });
    }
  }
);

userRoutes.post("/login", async (req: Request, res: Response) => {
  console.log(req.body);
  const { username, password } = req.body;
  const data = await UserInstance.findOne({
    where: { username: username },
  });
  Middleware.login(username, password).then((result) => {
    if (result === "success") {
      return res.json({
        msg: "You are now logged in",
        loggedIn: true,
        userId: data?.dataValues.id,
      });
    } else if (result === "Username not found") {
      return res.json({ msg: "Username not found", loggedIn: false });
    } else {
      return res.json({ msg: "Password incorrect", loggedIn: false });
    }
  });
});

userRoutes.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserInstance.findOne({
      where: { id: id },
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
    // console.log(record);
    return res.json({ user, msg: "Success" });
  } catch (error) {
    return res.json({ msg: "Error", status: 500, route: "/:id" });
  }
});

// userRoutes.get("/get/:username", async (req: Request, res: Response) => {
//   const { username } = req.params;
//   try {
//     const record = await UserInstance.findAll({
//       where: { username: username },
//     });
//     return res.json({ record, msg: "Success" });
//   } catch (error) {
//     return res.json({ msg: "Error", status: 500, route: "/get/:username" });
//   }
// });

export default userRoutes;
