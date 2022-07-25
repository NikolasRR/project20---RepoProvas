import { Request, Response, NextFunction } from "express";

import { newTestSchema } from "../schemas/testsSchemas.js";

export function verifyGroupByQuery(req: Request, res: Response, next: NextFunction) {
    const groupBy = req.query.groupBy;
    
    if (!groupBy) throw { type: "request format", details: "groupBy" }
    
    next();
}

export function verifyNewTestInfo(req: Request, res: Response, next: NextFunction) {
    const validation = newTestSchema.validate(req.body, {abortEarly: false});

    if (validation.error) throw { type: "request format", message: validation.error };
    
    next();
}