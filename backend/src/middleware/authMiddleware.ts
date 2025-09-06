import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

const JWT_ACCESS_SECRET = config.jwt.secret as string;

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders)
    return res
      .status(401)
      .json({ message: "Authorization header is missing." });

  const token = authHeaders.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ message: "Token is missing." });
  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
