import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "@/features/auth/context/AuthProvider";

export function Providers() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
