"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const audit_1 = require("./audit");
class QuestionInstance extends sequelize_1.Model {
}
exports.QuestionInstance = QuestionInstance;
QuestionInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    auditId: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
    },
    question: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    answer: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    correctAnswer: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    tableName: "questions",
});
QuestionInstance.belongsTo(audit_1.AuditInstance, { foreignKey: "auditId" });
audit_1.AuditInstance.hasMany(QuestionInstance, { foreignKey: "auditId" });
//# sourceMappingURL=question.js.map