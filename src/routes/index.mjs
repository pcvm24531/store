import { Router } from "express";
import loginRouter from "./login.mjs";
import usersRouter from "./users.mjs";
import productsRouter from "./products.mjs";
import authRouter from "./auth.mjs";

const router = Router();
router.use(loginRouter);
router.use(usersRouter);
router.use(productsRouter);
router.use(authRouter);

export default router;