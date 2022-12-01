import Router from "express-promise-router";
import user from "../controllers/user/user.js";

const router = Router();

router.get("/:id", user.get);

export default router;
