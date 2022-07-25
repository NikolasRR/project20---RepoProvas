import { DisciplineWithTests, TeacherDisciplines, TermWithDisciplines, TestForFront } from "../services/testsServices.js";

function populateTestsOfTeachersDisciplines(tests: TestForFront[], teacherDisciplines: TeacherDisciplines[]) {
    tests.forEach(test => {
        teacherDisciplines.forEach(teacherDiscipline => {
            if (teacherDiscipline.tests === undefined) teacherDiscipline.tests = [];
            if (test.discipline_id === teacherDiscipline.discipline.id
                && test.teacher_id === teacherDiscipline.teacher.id) {
                teacherDiscipline.tests.push(test);
            }
        })
    });

    return teacherDisciplines;
}

function populateTeachersDisciplinesOfDisciplines(teacherDisciplines: TeacherDisciplines[], disciplines: DisciplineWithTests[]) {
    teacherDisciplines.forEach(teacherDiscipline => {
        disciplines.forEach(discipline => {
            if (discipline.teacherDisciplines === undefined) discipline.teacherDisciplines = [];
            if (teacherDiscipline.discipline.id === discipline.id && teacherDiscipline.tests.length > 0) {
                discipline.teacherDisciplines.push(teacherDiscipline);
            }
        })
    });

    return disciplines;
}

function populateDisciplinesOfTerms(disciplines: DisciplineWithTests[], terms: TermWithDisciplines[]) {
    disciplines.forEach(discipline => {
        terms.forEach(term => {
            if (term.disciplines === undefined) term.disciplines = [];
            if (term.id === discipline.term_id) {
                term.disciplines.push(discipline);
            }
        })
    });

    return terms;
}

const testsUtils = {
    populateTestsOfTeachersDisciplines,
    populateTeachersDisciplinesOfDisciplines,
    populateDisciplinesOfTerms
};

export default testsUtils;