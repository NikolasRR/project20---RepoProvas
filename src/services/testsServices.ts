import { Category, Discipline, Teacher, Term } from "@prisma/client";

import testsRepository from "../repositories/testsRepository.js";
import testsUtils from "../utils/TestsUtils.js";

export type Test = {
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
    tests?: Test[]
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

async function getByDisciplines() {
    let terms: TermWithDisciplines[] = await testsRepository.getTerms();
    let disciplines: DisciplineWithTests[] = await testsRepository.getDisciplines();
    let tests: Test[] = await testsRepository.getTests();
    let teacherDisciplines: TeacherDisciplines[] = await testsRepository.getTeachersDisciplines();

    teacherDisciplines = testsUtils.populateTestsOfTeachersDisciplines(tests, teacherDisciplines);

    disciplines = testsUtils.populateTeachersDisciplinesOfDisciplines(teacherDisciplines, disciplines);

    terms = testsUtils.populateDisciplinesOfTerms(disciplines, terms);

    return { tests: terms };
}

async function getByInstructor() {
    let tests: Test[] = await testsRepository.getTests();
    let teacherDisciplines: TeacherDisciplines[] = await testsRepository.getTeachersDisciplines();

    teacherDisciplines = testsUtils.populateTestsOfTeachersDisciplines(tests, teacherDisciplines);

    return { tests: teacherDisciplines };
}

const testsServices = {
    getByDisciplines,
    getByInstructor
};

export default testsServices;