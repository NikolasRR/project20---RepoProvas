import { Router } from "express";

import authRouter from "./authRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import testRouter from "./testsRouter.js";

const router = Router();

router.use(authRouter);
router.use(testRouter);
router.use(categoriesRouter);

export default router;