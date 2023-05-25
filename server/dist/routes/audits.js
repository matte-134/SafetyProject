"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const models_1 = require("../models");
const middleware_1 = __importDefault(require("../middleware"));
const auditRoutes = express_1.default.Router();
auditRoutes.get("/read", async (req, res) => {
    try {
        const record = await models_1.UserInstance.findAll({
            include: [
                {
                    model: models_1.AuditInstance,
                    include: [
                        {
                            model: models_1.QuestionInstance,
                        },
                    ],
                },
            ],
        });
        return res.json(record);
    }
    catch (error) {
        return res.json({ msg: "Error", status: 500, route: "/read" });
    }
});
auditRoutes.post("/newaudit", async (req, res) => {
    const { userId } = req.body;
    const id = (0, uuid_1.v4)();
    const date = new Date();
    console.log(userId);
    try {
        const auditRecord = await models_1.AuditInstance.create({ userId, date, id });
        middleware_1.default.populateQuestions(id);
        return res.json({
            record: auditRecord,
            msg: "Success",
        });
    }
    catch (error) {
        return res.json({ msg: "Error", status: 500, route: "/newaudit" });
    }
});
exports.default = auditRoutes;
//# sourceMappingURL=audits.js.map