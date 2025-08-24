import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config";

const ACCESS_SECRET = config.jwt.secret as string;
const REFRESH_SECRET = config.jwt.refreshSecret as string;

export interface JwtPayload {
  sub: number | undefined; // user id
  email: string;
  type: "access" | "refresh";
}

export const signInAccessToken = (payload: Omit<JwtPayload, "type">) => {
  const options: SignOptions = { expiresIn: "15m" }; // access tokens short-lived
  return jwt.sign(payload, ACCESS_SECRET, options);
};

export const signInRefreshToken = (payload: Omit<JwtPayload, "type">) => {
  const options: SignOptions = { expiresIn: "7d" }; // refresh tokens long-lived
  return jwt.sign({ ...payload, type: "refresh" }, REFRESH_SECRET, options);
};

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, ACCESS_SECRET) as unknown as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, REFRESH_SECRET) as unknown as JwtPayload;
}
