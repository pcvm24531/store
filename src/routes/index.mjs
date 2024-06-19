import { Router } from "express";
import loginRouter from "./login.mjs";
import usersRouter from "./users.mjs";
import productsRouter from "./products.mjs";

const router = Router();
router.use(loginRouter);
router.use(usersRouter);
router.use(productsRouter);

export default router;