import Router from "express-promise-router";
import userController from "../controllers/user/user.rest.contoller.js";

const router = Router();

router.get("/:id", userController.getOne);

export default router;
