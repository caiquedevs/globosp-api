import { Router } from "express";

import LoginController from "../controllers/LoginController";
const router = Router();

// Login
router.post("/login", LoginController.loginUser);

// Register
router.post("/register", LoginController.registerUser);

export default router;
