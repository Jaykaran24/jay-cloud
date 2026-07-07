import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { UserPlus, Trash2, Loader2, Users, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/context/AuthContext";

// ── Types ──────────────────────────────────────────────────────────────────

interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

// ── Zod schema ─────────────────────────────────────────────────────────────

const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["admin", "user"]),
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;

// ── API helpers ────────────────────────────────────────────────────────────

async function fetchUsers(token: string | null): Promise<ApiUser[]> {
  const res = await fetch("/api/users", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return (await res.json()) as ApiUser[];
}

async function createUser(
  data: CreateUserFormValues,
  token: string | null
): Promise<ApiUser> {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let msg = "Failed to create user";
    try {
      const body = (await res.json()) as { message?: string };
      if (body.message) msg = body.message;
    } catch { /* ignore */ }
    throw new Error(msg);
  }
  return (await res.json()) as ApiUser;
}

async function deleteUser(id: string, token: string | null): Promise<void> {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to delete user");
}

// ── Skeleton row ───────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-5 py-4 animate-pulse">
      <div className="h-4 w-1/4 rounded bg-zinc-800" />
      <div className="h-4 w-1/3 rounded bg-zinc-800" />
      <div className="h-5 w-14 rounded-full bg-zinc-800" />
      <div className="ml-auto h-4 w-24 rounded bg-zinc-800" />
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function UsersPage() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const qc = useQueryClient();
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);

  // Redirect non-admins
  if (user?.role !== "admin") {
    navigate("/dashboard", { replace: true });
    return null;
  }

  const { data: users, isLoading } = useQuery<ApiUser[], Error>({
    queryKey: ["users"],
    queryFn: () => fetchUsers(token),
  });

  const createMutation = useMutation({
    mutationFn: (values: CreateUserFormValues) => createUser(values, token),
    onSuccess: (created) => {
      void qc.invalidateQueries({ queryKey: ["users"] });
      setCreateSuccess(`User "${created.email}" created successfully.`);
      setCreateError(null);
      reset();
    },
    onError: (err: Error) => {
      setCreateError(err.message);
      setCreateSuccess(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id, token),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { role: "user" },
  });

  const onSubmit = (values: CreateUserFormValues) => {
    setCreateSuccess(null);
    setCreateError(null);
    createMutation.mutate(values);
  };

  return (
    <div className="min-h-screen bg-[#09090b] px-4 pb-16 pt-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-4 flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 ring-1 ring-blue-500/20">
              <Users size={22} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">User Management</h1>
              <p className="text-sm text-zinc-500">Admin-only — create and manage platform users</p>
            </div>
          </div>
        </motion.div>

        {/* Add User card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mb-6 rounded-2xl border border-zinc-800/60 bg-zinc-900/60 p-6 backdrop-blur-xl"
        >
          <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
            <UserPlus size={17} className="text-blue-400" />
            Add New User
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Jay Karan"
                  {...register("name")}
                  className="h-10 rounded-xl border-zinc-700/60 bg-zinc-800/60 text-white placeholder:text-zinc-600"
                />
                {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  {...register("email")}
                  className="h-10 rounded-xl border-zinc-700/60 bg-zinc-800/60 text-white placeholder:text-zinc-600"
                />
                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="new-password" className="block text-sm font-medium text-zinc-300">
                  Password
                </label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Min 8 characters"
                  {...register("password")}
                  className="h-10 rounded-xl border-zinc-700/60 bg-zinc-800/60 text-white placeholder:text-zinc-600"
                />
                {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label htmlFor="role" className="block text-sm font-medium text-zinc-300">
                  Role
                </label>
                <select
                  id="role"
                  {...register("role")}
                  className="h-10 w-full rounded-xl border border-zinc-700/60 bg-zinc-800/60 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && <p className="text-xs text-red-400">{errors.role.message}</p>}
              </div>
            </div>

            {/* Feedback */}
            {createSuccess && (
              <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2.5 text-sm text-green-400">
                {createSuccess}
              </div>
            )}
            {createError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                {createError}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || createMutation.isPending}
              className="h-10 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 disabled:opacity-60"
            >
              {createMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={15} className="animate-spin" />
                  Creating…
                </span>
              ) : (
                "Create User"
              )}
            </Button>
          </form>
        </motion.div>

        {/* Users list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="rounded-2xl border border-zinc-800/60 bg-zinc-900/60 p-6 backdrop-blur-xl"
        >
          <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
            <ShieldCheck size={17} className="text-violet-400" />
            Platform Users
          </h2>

          <div className="space-y-2">
            {isLoading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : !users || users.length === 0 ? (
              <div className="py-10 text-center text-sm text-zinc-600">
                No users yet. Add your first user above.
              </div>
            ) : (
              users.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 rounded-xl border border-zinc-800/50 bg-zinc-900/40 px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{u.name}</p>
                    <p className="truncate text-xs text-zinc-500">{u.email}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      u.role === "admin"
                        ? "bg-blue-500/15 text-blue-400"
                        : "bg-zinc-700/40 text-zinc-400"
                    }`}
                  >
                    {u.role}
                  </span>
                  <span className="hidden shrink-0 text-xs text-zinc-600 sm:block">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => deleteMutation.mutate(u.id)}
                    disabled={deleteMutation.isPending}
                    aria-label={`Delete user ${u.email}`}
                    className="shrink-0 rounded-lg p-1.5 text-zinc-600 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
