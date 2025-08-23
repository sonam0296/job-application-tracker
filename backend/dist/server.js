"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Import the compiled JS entry explicitly so Node's ESM resolver doesn't try a directory import
const index_js_1 = __importDefault(require("./routes/index.js"));
const PORT = 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", index_js_1.default);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
