import User from './user.model.mjs'
import Task from "./task.model.mjs";
import Document from "./documents.model.mjs";
import sequelize from "../config/db.mjs";
/* User → Task */
User.hasMany(Task, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Task.belongsTo(User, {
  foreignKey: "userId",
});

/* User → Document */
User.hasMany(Document, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Document.belongsTo(User, {
  foreignKey: "userId",
});

export { sequelize, User, Task, Document };
