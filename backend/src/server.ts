import express from "express";
import cors from "cors";
// Import the compiled JS entry explicitly so Node's ESM resolver doesn't try a directory import
import router from "./route/index";
import sequelize from "./lib/sequelize";
import "./model/UserModel";
import "./model/JobModel";
import logger from "./utils/logger";

const PORT = 9000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info("✅ DB connected");

    // Sync models → creates table if not exists
    await sequelize.sync({ alter: true });
    logger.info("✅ Tables synced");

    app.listen(PORT, () => logger.info(`🚀 Server is running on port ${PORT}`));
  } catch (error) {
    logger.error("❌ DB connection error:", error);
  }
};

startServer();
