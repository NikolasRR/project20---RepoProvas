import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type TokenUser = {
    id: number
    email: string
    iat: number
    exp: number 
}

export default async function tokenValidator(req: Request, res: Response, next: NextFunction) {
    const rawToken: string = req.headers.authorization;
    if (!rawToken) throw { type: "request format", details: "token"};
    const token = rawToken.replace("Bearer", "").trim();
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded: TokenUser) => {
        if (err) throw { type: "request format", details: "jwt" };
        res.locals.user = decoded;
    });
    
    next();
}