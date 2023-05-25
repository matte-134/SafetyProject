"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const user_1 = require("./user");
class AuditInstance extends sequelize_1.Model {
}
exports.AuditInstance = AuditInstance;
AuditInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    userId: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    tableName: "audits",
});
AuditInstance.belongsTo(user_1.UserInstance, { foreignKey: "userId" });
user_1.UserInstance.hasMany(AuditInstance, { foreignKey: "userId" });
//# sourceMappingURL=audit.js.map