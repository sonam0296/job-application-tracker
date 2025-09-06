import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/sequelize";
import User from "./UserModel";
// Create Job model (title, company, status, notes)
interface JobAttributes {
  id: number;
  title: string;
  company: string;
  status: "applied" | "interview" | "offer" | "rejected"; // restricts values
  notes?: string;
  userId: number; // foreign key.
}

interface JobCreationAttributes extends Optional<JobAttributes, "id"> {}

class Job
  extends Model<JobAttributes, JobCreationAttributes>
  implements JobAttributes
{
  public id!: number;
  public title!: string;
  public company!: string;
  public status!: "applied" | "interview" | "offer" | "rejected";
  public notes?: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("applied", "interview", "offer", "rejected"),
      allowNull: false,
      defaultValue: "applied",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  { sequelize, tableName: "jobs", timestamps: true }
);

// Associations
User.hasMany(Job, { foreignKey: "userId" });
Job.belongsTo(User, { foreignKey: "userId" });

export default Job;
