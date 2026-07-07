import type { User } from "../context/AuthContext";

export interface LoginResponse {
  token: string;
  user: User;
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let message = "Login failed. Please check your credentials.";
    try {
      const body = (await res.json()) as { error?: string; message?: string };
      if (body.error) {
        message = body.error;
      } else if (body.message) {
        message = body.message;
      }
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  const data = (await res.json()) as LoginResponse;
  return data;
}

export function logoutUser(): void {
  // Client-side only logout — extend later for DELETE /api/auth/logout
}
