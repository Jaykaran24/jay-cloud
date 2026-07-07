import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

export async function getUsers(_req: Request, res: Response): Promise<void> {
  const users = await User.find({}, "-passwordHash").sort({ createdAt: -1 });
  res.json(users);
}

export async function createUser(req: Request, res: Response): Promise<void> {
  const { name, email, password, role } = req.body as {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
  };
  if (!name || !email || !password) {
    res.status(400).json({ error: "Name, email and password required" });
    return;
  }
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(409).json({ error: "Email already in use" });
    return;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash, role: role ?? "user" });
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  });
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: "User deleted" });
}
