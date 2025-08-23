"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = __importDefault(require("./authRoute"));
const applicationsRoute_1 = __importDefault(require("./applicationsRoute"));
const usersRoute_1 = __importDefault(require("./usersRoute"));
const router = (0, express_1.Router)();
router.use("/auth", authRoute_1.default);
router.use("/applications", applicationsRoute_1.default);
router.use("/users", usersRoute_1.default);
exports.default = router;
