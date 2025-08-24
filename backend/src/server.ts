import express from "express";
import cors from "cors";
// Import the compiled JS entry explicitly so Node's ESM resolver doesn't try a directory import
import router from "./route/index";
import sequelize from "./lib/sequelize";
import "./model/UserModel";

const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    // Sync models → creates table if not exists
    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced");

    app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
  } catch (error) {
    console.error("❌ DB connection error:", error);
  }
};

startServer();
