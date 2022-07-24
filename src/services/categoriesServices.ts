import categoriesRepository from "../repositories/categoriesRepository.js";

async function getCategories() {
    const result = await categoriesRepository.getCategories();
    
    return {
        categories: result
    };
}

const categoriesServices = {
    getCategories
};

export default categoriesServices;