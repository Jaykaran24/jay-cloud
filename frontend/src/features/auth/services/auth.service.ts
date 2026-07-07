import type { User } from "../context/AuthContext";

export interface LoginResponse {
  token: string;
  user: User;
}

// TODO: Remove mock credentials when backend is ready
const MOCK_CREDENTIALS = {
  email: "admin@jaycloud.local",
  password: "admin1234",
  response: {
    token: "dev-mock-token-admin",
    user: {
      id: "1",
      name: "Jay Karan",
      email: "admin@jaycloud.local",
      role: "admin" as const,
    },
  } satisfies LoginResponse,
};

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  // Mock login — works without a running backend (dev/testing only)
  // TODO: Remove mock credentials when backend is ready
  if (
    email === MOCK_CREDENTIALS.email &&
    password === MOCK_CREDENTIALS.password
  ) {
    return MOCK_CREDENTIALS.response;
  }

  // Real backend call — used for any other credentials
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let message = "Login failed. Please check your credentials.";
    try {
      const body = (await res.json()) as { message?: string };
      if (body.message) message = body.message;
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
