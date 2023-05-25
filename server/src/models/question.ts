import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";
import { AuditInstance } from "./audit";

export interface QuestionAttributes {
  id: string;
  auditId: string;
  question: string;
  answer: boolean;
  correctAnswer: boolean;
}

export class QuestionInstance extends Model<QuestionAttributes> {}

QuestionInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    auditId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    correctAnswer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "questions",
  }
);

QuestionInstance.belongsTo(AuditInstance, { foreignKey: "auditId" });
AuditInstance.hasMany(QuestionInstance, { foreignKey: "auditId" });
