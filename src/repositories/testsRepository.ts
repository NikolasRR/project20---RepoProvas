import { prisma } from "../database/db.js";
import { TeacherDisciplines, Test } from "../services/testsServices.js";

async function getTests() {
    const result: Test[] = await prisma.$queryRaw`
        SELECT ts.id, ts.name, ts.link as "pdfUrl", tc.id as teacher_id, d.id as discipline_id, json_build_object('id', c.id, 'name', c.name) as category
        FROM tests ts
        JOIN categories c ON ts.category_id = c.id
        JOIN teachers tc ON ts.teacher_id = tc.id
        JOIN disciplines d ON ts.discipline_id = d.id
    `;
    return result;
}

async function getTerms() {
    return await prisma.term.findMany();
}

async function getDisciplines() {
    return await prisma.discipline.findMany();
}

async function getTeachersDisciplines() {
    const result: TeacherDisciplines[] =  await prisma.$queryRaw`
        SELECT td.id, json_build_object('id', d.id, 'name', d.name) as discipline, json_build_object('id', tc.id, 'name', tc.name) as teacher
        FROM "teachersDisciplines" td
        JOIN disciplines d ON td.discipline_id = d.id
        JOIN teachers tc ON td.teacher_id = tc.id
    `;
    return result;
}

const testsRepository = {
    getTests,
    getTerms,
    getDisciplines,
    getTeachersDisciplines
};

export default testsRepository;