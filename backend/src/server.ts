import express from "express";
import cors from "cors";
// Import the compiled JS entry explicitly so Node's ESM resolver doesn't try a directory import
import router from "./route/index";

const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
