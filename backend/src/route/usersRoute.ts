import { Router, Request, Response } from "express";

const router = Router();

// GET /users - list users (placeholder)
router.get("/", async (req: Request, res: Response) => {
  res.json({ message: "List of users (placeholder)" });
});

// GET /users/:id - get user (placeholder)
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `User ${id} (placeholder)` });
});

export default router;
