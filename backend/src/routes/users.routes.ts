import { Router } from "express";
import { getUsers, createUser, deleteUser } from "../controllers/users.controller";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware";

const router = Router();
router.use(requireAuth, requireAdmin);
router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", deleteUser);
export default router;
