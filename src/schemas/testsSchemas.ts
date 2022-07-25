import { Test } from "@prisma/client";
import Joi from "joi";

export const newTestSchema = Joi.object<Test>({
    name: Joi.string().required(),
    link: Joi.string().uri().required(),
    teacher_id: Joi.number().required(),
    discipline_id: Joi.number().required(),
    category_id: Joi.number().required()
});