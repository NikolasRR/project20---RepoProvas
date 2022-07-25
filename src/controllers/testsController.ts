import { Request, Response } from "express";
import { Test } from "@prisma/client";

import testsServices from "../services/testsServices.js";
import { TokenUser } from "../middlewares/tokenValidator.js";

export async function getTests(req: Request, res: Response) {
    const groupBy = req.query.groupBy;
    if (groupBy === 'disciplines') {
        const tests = await testsServices.getByDisciplines();
        return res.send(tests);
    }

    const tests = await testsServices.getByInstructor();
    res.send(tests);
}

export async function addTest(req: Request, res: Response) {
    const user: TokenUser = res.locals.user;
    const testInfo: Test = req.body;
    testInfo.author_id = user.id;

    await testsServices.addNewTest(testInfo);

    res.sendStatus(201);
}