import Joi from "joi";

import { UserData } from "../services/authServices.js";

export const signUpSchema = Joi.object<UserData>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});