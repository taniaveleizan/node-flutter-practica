import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/api/user/register", register);
router.post("/api/user/login", login);

export default router;