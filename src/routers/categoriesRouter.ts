import { Router } from "express";

import * as C from "../controllers/categoriesControllers.js";
import tokenValidator from "../middlewares/tokenValidator.js";

const categoriesRouter = Router();

categoriesRouter.get('/categories', tokenValidator, C.getAllCategories);

export default categoriesRouter;