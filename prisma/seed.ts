import { prisma } from "../src/database/db.js";
import bcrypt from "bcrypt";

async function doSomething() {
    await prisma.$queryRaw`
        INSERT INTO terms ("number") VALUES (1);
        INSERT INTO terms ("number") VALUES (2);
        INSERT INTO terms ("number") VALUES (3);
        INSERT INTO terms ("number") VALUES (4);        
        INSERT INTO terms ("number") VALUES (5);        
        INSERT INTO terms ("number") VALUES (6);

        INSERT INTO categories ("name") VALUES ('Projeto');
        INSERT INTO categories ("name") VALUES ('Prática');        
        INSERT INTO categories ("name") VALUES ('Recuperação');

        INSERT INTO teachers ("name") VALUES ('Diego Pinho');
        INSERT INTO teachers ("name") VALUES ('Bruna Hamori');   
         
        INSERT INTO disciplines ("name", "term_id") VALUES ('HTML e CSS', 1);
        INSERT INTO disciplines ("name", "term_id") VALUES ('JavaScript', 2);
        INSERT INTO disciplines ("name", "term_id") VALUES ('Humildade', 1);
        INSERT INTO disciplines ("name", "term_id") VALUES ('Planejamento', 2);        
        INSERT INTO disciplines ("name", "term_id") VALUES ('Autoconfiança', 3);        
        INSERT INTO disciplines ("name", "term_id") VALUES ('React', 3);      

        INSERT INTO "teachersDisciplines" ("teacher_id", "discipline_id") VALUES (1, 1);
        INSERT INTO "teachersDisciplines" ("teacher_id", "discipline_id") VALUES (1, 2);
        INSERT INTO "teachersDisciplines" ("teacher_id", "discipline_id") VALUES (1, 3); 
        INSERT INTO "teachersDisciplines" ("teacher_id", "discipline_id") VALUES (2, 4);        
        INSERT INTO "teachersDisciplines" ("teacher_id", "discipline_id") VALUES (2, 5);        
        INSERT INTO "teachersDisciplines" ("teacher_id", "discipline_id") VALUES (2, 6);
        
        INSERT INTO users (email, password) VALUES ('nelson@gmail.com', ${bcrypt.hashSync('1234', 10)})        INSERT INTO tests (name, link, category_id, author_id, teacher_id, discipline_id) VALUES ('teste1', 'link1', 2, 1, 1, 2);
        INSERT INTO tests (name, link, category_id, author_id, teacher_id, discipline_id) VALUES ('teste2', 'link2', 2, 1, 2, 4);
        `;
}

// doSomething().catch(e => {
//     console.log('failed to set up');
//     console.log(e);
//     process.exit(1);
// }).finally(async () => {
//     await prisma.$disconnect();
// })