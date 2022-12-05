import express from 'express';
import userController from "../controllers/user/user.rest.contoller.js";

const router = express.Router();

router.get("/:id", userController.getOne);

export default router;
