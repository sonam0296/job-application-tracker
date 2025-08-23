import { Router, Request, Response } from "express";

const router = Router();

// POST /auth/login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Placeholder logic
  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }

  res.json({ message: "Logged in (placeholder)", email });
});

// POST /auth/register
router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }
  res.status(201).json({ message: "Registered (placeholder)", email });
});

export default router;
