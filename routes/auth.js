import express from 'express';
import authController from "../controllers/auth/auth.rest.controller.js";

const router = express.Router();

router.get("/register", authController.register);
router.get("/login", authController.login);

export default router;
