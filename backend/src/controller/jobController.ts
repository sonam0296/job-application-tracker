import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Job from "../model/JobModel";

export const createJobs = async (req: AuthRequest, res: Response) => {
  try {
    const { title, status, company, notes } = req.body;
    const userId = req.user.sub; // comes from JWT middleware
    console.log(userId, "UserId", req.user);
    const job = await Job.create({ title, status, company, notes, userId });
    return res.status(201).json(job);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all jobs for logged-in user
export const getJobs = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.sub;
    const jobs = await Job.findAll({ where: { userId } });
    if (!jobs) return res.status(404).json({ message: "Job not found!" });
    return res.status(200).json(jobs);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get job by id
export const getJobById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const jobs = await Job.findOne({ where: { id, userId: req.user.sub } });
    if (!jobs) return res.status(404).json({ message: "Job not found!" });
    return res.status(200).json(jobs);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateJobs = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    console.log(req.user, "jhdxfghj");
    const { title, company, status, notes } = req.body;
    const job = await Job.findOne({ where: { id, userId: req.user.sub } });
    if (!job) return res.status(404).json({ message: "Job not Found" });
    await Job.update(
      { title, company, status, notes },
      { where: { id, userId: req.user.sub } }
    );
    return res.status(200).json(job);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteJobs = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const job = await Job.findOne({ where: { id, userId: req.user.sub } });
    if (!job) return res.status(404).json({ message: "No Job Found!" });
    await job.destroy();
    return res.status(200).json({ message: "Job deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
