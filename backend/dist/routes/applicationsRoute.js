"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET /applications - list (placeholder)
router.get("/", async (req, res) => {
    res.json({ message: "List of applications (placeholder)" });
});
// POST /applications - create (placeholder)
router.post("/", async (req, res) => {
    const payload = req.body;
    res
        .status(201)
        .json({ message: "Application created (placeholder)", payload });
});
exports.default = router;
