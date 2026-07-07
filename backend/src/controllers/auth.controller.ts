import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { signToken } from "../utils/jwt";

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as { email: string; password: string };
  if (!email || !password) {
    res.status(400).json({ error: "Email and password required" });
    return;
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });
  const token = signToken({ id: user._id.toString(), email: user.email, role: user.role });
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
}

export async function seedAdmin(_req: Request, res: Response): Promise<void> {
  const exists = await User.findOne({ email: "admin@jaycloud.local" });
  if (exists) {
    res.json({ message: "Admin already exists" });
    return;
  }
  const passwordHash = await bcrypt.hash("admin1234", 12);
  await User.create({
    name: "Jay Karan",
    email: "admin@jaycloud.local",
    passwordHash,
    role: "admin",
  });
  res.json({ message: "Admin seeded successfully" });
}
