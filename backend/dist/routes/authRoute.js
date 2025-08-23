"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// POST /auth/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // Placeholder logic
    if (!email || !password) {
        return res.status(400).json({ error: "email and password required" });
    }
    res.json({ message: "Logged in (placeholder)", email });
});
// POST /auth/register
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "email and password required" });
    }
    res.status(201).json({ message: "Registered (placeholder)", email });
});
exports.default = router;
