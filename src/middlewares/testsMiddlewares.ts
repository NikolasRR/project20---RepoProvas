import { Request, Response, NextFunction } from "express";

export function verifyGroupByQuery(req: Request, res: Response, next: NextFunction) {
    const groupBy = req.query.groupBy;
    
    if (!groupBy) throw { type: "request format", details: "groupBy" }
    
    next();
}