import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jay-cloud-dev-secret-change-in-prod";
const JWT_EXPIRES = "7d";

export function signToken(payload: { id: string; email: string; role: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES } as jwt.SignOptions);
}

export function verifyToken(token: string): { id: string; email: string; role: string } {
  return jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
}
