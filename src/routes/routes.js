import express from "express";
import { getUser, login, register } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/api/auth/register", register);
router.post("/api/auth/login", login);
router.get("/api/auth/user", authMiddleware, getUser);

export default router;