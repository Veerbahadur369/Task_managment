import { DataTypes } from "sequelize";
import sequelize from "../config/db.mjs";
import User from "./user.model.mjs";

const Documents = sequelize.define(
  "Document",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    documentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    documentUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },

      userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
  },
  {
    tableName: "documents",
    timestamps: true,
  }
);

export default Documents;
