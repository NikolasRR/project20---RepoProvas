import { Request, Response } from "express";

import categoriesServices from "../services/categoriesServices.js";

export async function getAllCategories(req: Request, res: Response) {
    const categories = await categoriesServices.getCategories();

    res.send(categories);
}

