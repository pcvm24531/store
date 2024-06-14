import { Router } from "express";
import homeRouter from "./home.mjs";
import usersRouter from "./users.mjs";
import productsRouter from "./products.mjs";

const router = Router();
router.use(homeRouter);
router.use(usersRouter);
router.use(productsRouter);

export default router;