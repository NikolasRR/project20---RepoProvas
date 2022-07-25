import { Category, Discipline, Teacher, Term, Test } from "@prisma/client";

import testsRepository from "../repositories/testsRepository.js";
import testsUtils from "../utils/TestsUtils.js";

export type TestForFront = {
    id: number,
    name: string,
    pdfUrl: string,
    teacher_id: number,
    discipline_id: number,
    category: Category
}

export type TeacherDisciplines = {
    id: number,
    teacher?: Teacher,
    discipline: Omit<Discipline, "term_id">
    tests?: TestForFront[]
}

export type DisciplineWithTests = {
    id: number,
    name: string,
    term_id: number,
    teacherDisciplines?: TeacherDisciplines[]
}

export type TermWithDisciplines = Term & {
    disciplines?: DisciplineWithTests[],
}

export type NewTest = {
    name: string,
    link: string,
    teacher_id: number,
    discipline_id: number,
    category_id: number,
    author_id?: number
}

async function getByDisciplines() {
    let terms: TermWithDisciplines[] = await testsRepository.getTerms();
    let disciplines: DisciplineWithTests[] = await testsRepository.getDisciplines();
    let tests: TestForFront[] = await testsRepository.getTests();
    let teacherDisciplines: TeacherDisciplines[] = await testsRepository.getTeachersDisciplines();

    teacherDisciplines = testsUtils.populateTestsOfTeachersDisciplines(tests, teacherDisciplines);

    disciplines = testsUtils.populateTeachersDisciplinesOfDisciplines(teacherDisciplines, disciplines);

    terms = testsUtils.populateDisciplinesOfTerms(disciplines, terms);

    return { tests: terms };
}

async function getByInstructor() {
    let tests: TestForFront[] = await testsRepository.getTests();
    let teacherDisciplines: TeacherDisciplines[] = await testsRepository.getTeachersDisciplines();

    teacherDisciplines = testsUtils.populateTestsOfTeachersDisciplines(tests, teacherDisciplines);

    return { tests: teacherDisciplines };
}

async function addNewTest(testInfo: Test) {
    const link = await testsRepository.getTestByLink(testInfo.link);
    if (link) throw {type: "conflict", details: "test link"};

    const category = await testsRepository.getCategoryById(testInfo.category_id);
    if (!category) throw {type: "not found", details: "category"};

    const discipline = await testsRepository.getDisciplineById(testInfo.discipline_id);
    if (!discipline) throw {type: "not found", details: "discipline"};

    const teacher = await testsRepository.getTeacherById(testInfo.teacher_id);
    if (!teacher) throw {type: "not found", details: "teacher"};


    await testsRepository.addNewTest(testInfo);
}

const testsServices = {
    getByDisciplines,
    getByInstructor,
    addNewTest
};

export default testsServices;