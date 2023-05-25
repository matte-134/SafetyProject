import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";
import { UserInstance } from "./user";

export interface AuditAttributes {
  id: string;
  date: Date;
  completed: boolean;
  score: number;
  userId: string;
}

export class AuditInstance extends Model<AuditAttributes> {}

AuditInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "audits",
  }
);

AuditInstance.belongsTo(UserInstance, { foreignKey: "userId" });
UserInstance.hasMany(AuditInstance, { foreignKey: "userId" });
