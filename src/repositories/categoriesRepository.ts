import { prisma } from "../database/db.js";

async function getCategories() {
    return await prisma.category.findMany();
}

const categoriesRepository = {
    getCategories
};

export default categoriesRepository;