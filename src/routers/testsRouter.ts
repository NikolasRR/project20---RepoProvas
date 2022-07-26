import { Router } from "express";

import * as C from "../controllers/testsController.js";
import * as M from "../middlewares/testsMiddlewares.js"
import tokenValidator from "../middlewares/tokenValidator.js";

const testRouter = Router();

testRouter.get('/tests', tokenValidator, M.verifyGroupByQuery, C.getTests);
testRouter.post('/tests', tokenValidator, M.verifyNewTestInfo, C.addTest);

export default testRouter;