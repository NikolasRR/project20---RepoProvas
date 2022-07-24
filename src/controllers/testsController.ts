import { Request, Response } from "express";

import testsServices from "../services/testsServices.js";

export async function getTestsByDiscipline(req: Request, res: Response) {
    const groupBy = req.query.groupBy;
    if (groupBy === 'disciplines') {
        const tests = await testsServices.getByDisciplines();
        return res.send(tests);
    }

    const tests = await testsServices.getByInstructor();
    res.send(tests);
}