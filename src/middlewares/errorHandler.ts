import { Request, Response, NextFunction } from "express";

type error = {
    type: string,
    details: string,
    message: string
};

export default async function errorHandler(error: error, req: Request, res: Response, next: NextFunction) {
    let code: number;
    
    switch (error.type) {
        case "conflict":
            code = 409;
            error.message = "email already in use";
            break;
        case "request format":
            code = 422;
            if (error.details === "token") error.message = "missing token";
            if (error.details === "jwt") error.message = "token invalid or expired";
            if (error.details === "groupBy") error.message = "group by clause missing";
            break;
        case "unauthorized":
            code = 401;
            error.message = "wrong password";
            break;
        case "not found":
            code = 404;
            error.message = "email not registered";
            break;
        default:
            code = 500;
            break;
    }
    
    res.status(code).send(error.message);
}