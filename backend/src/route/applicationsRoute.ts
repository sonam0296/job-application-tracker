import { Router, Request, Response } from "express";

const router = Router();

// GET /applications - list (placeholder)
router.get("/", async (req: Request, res: Response) => {
  res.json({ message: "List of applications (placeholder)" });
});

// POST /applications - create (placeholder)
router.post("/", async (req: Request, res: Response) => {
  const payload = req.body;
  res
    .status(201)
    .json({ message: "Application created (placeholder)", payload });
});

export default router;
