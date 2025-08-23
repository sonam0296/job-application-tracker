"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET /users - list users (placeholder)
router.get("/", async (req, res) => {
    res.json({ message: "List of users (placeholder)" });
});
// GET /users/:id - get user (placeholder)
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    res.json({ message: `User ${id} (placeholder)` });
});
exports.default = router;
