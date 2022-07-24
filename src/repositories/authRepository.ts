import { prisma } from "../database/db.js";

import { UserData } from "../services/authServices.js";

async function getByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
}

async function create(newUserData: UserData) {
    await prisma.user.create({ data: newUserData });
}

export const authRepository = {
    getByEmail,
    create
}