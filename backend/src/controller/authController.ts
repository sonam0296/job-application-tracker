import { Request, Response } from "express";
import { registerUser, validateUser } from "../service/authService";
import { signInAccessToken, signInRefreshToken } from "../utils/jwt";
import { refreshStore } from "./tokenStore";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password)
      return res.status(400).json({ message: "Email & Password is required." });

    const user = await registerUser(email, password);
    // Issue tokens on register
    const access = signInAccessToken({ sub: user?.id, email: email });
    const refresh = signInRefreshToken({ sub: user?.id, email: email });

    refreshStore.set(user?.id, refresh);

    return res.status(201).json({ user, tokens: { access, refresh } });
  } catch (error: any) {
    const msg = error?.message || "Registration failed";
    const code = msg.includes("exists") ? 409 : 500;
    return res.status(code).json({ message: msg });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email & Password is required!" });
    const user = await validateUser(email, password);
    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

    const access = signInAccessToken({ sub: user.id, email: user.email });
    const refresh = signInRefreshToken({ sub: user.id, email: user.email });

    // rotate / replace existing refresh
    refreshStore.set(user.id, refresh);
    return res.status(200).json({ user, tokens: { access, refresh } });
  } catch (error: any) {
    const msg = error?.message || "Login failed";
    return res.status(500).json({ message: msg });
  }
};
