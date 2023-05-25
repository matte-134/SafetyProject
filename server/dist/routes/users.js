"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const models_1 = require("../models");
const validator_1 = __importDefault(require("../validator/"));
const middleware_1 = __importDefault(require("../middleware"));
const bcrypt_1 = require("bcrypt");
const userRoutes = express_1.default.Router();
userRoutes.post("/create", validator_1.default.checkCreateUser(), middleware_1.default.handleValidationError, async (req, res) => {
    const id = (0, uuid_1.v4)();
    // try {
    const hashedPw = await (0, bcrypt_1.hash)(req.body.password, 10);
    const record = await models_1.UserInstance.create({
        username: req.body.username,
        email: req.body.email,
        position: req.body.position,
        password: hashedPw,
        id,
    });
    return res.json({ record, msg: "Success" });
    // } catch (error) {
    //   return res.json({ msg: "Error", status: 500, route: "/create" });
    // }
});
userRoutes.post("/login", async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const data = await models_1.UserInstance.findOne({
        where: { username: username },
    });
    middleware_1.default.login(username, password).then((result) => {
        if (result === "success") {
            return res.json({
                msg: "You are now logged in",
                loggedIn: true,
                userId: data === null || data === void 0 ? void 0 : data.dataValues.id,
            });
        }
        else if (result === "Username not found") {
            return res.json({ msg: "Username not found", loggedIn: false });
        }
        else {
            return res.json({ msg: "Password incorrect", loggedIn: false });
        }
    });
});
// userRoutes.get("/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const record = await UserInstance.findByPk(id);
//     console.log(record);
//     return record;
//   } catch (error) {
//     return res.json({ msg: "Error", status: 500, route: "/:id" });
//   }
// });
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
exports.default = userRoutes;
//# sourceMappingURL=users.js.map