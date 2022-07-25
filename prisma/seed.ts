import { prisma } from "../src/database/db.js";
import bcrypt from "bcrypt";

async function populateDB() {
    await prisma.term.createMany({
        data: [
            { number: 1 },
            { number: 2 },
            { number: 3 },
            { number: 4 },
            { number: 5 },
            { number: 6 }
        ]
    });

    await prisma.category.createMany({
        data: [
            { name: 'Projeto' },
            { name: 'Prática' },
            { name: 'Recuperação' }
        ]
    });


    await prisma.teacher.createMany({
        data: [
            { name: 'Diego Pinho' },
            { name: 'Bruna Hamori' }
        ]
    });

    await prisma.discipline.createMany({
        data: [
            { name: 'HTML e CSS', term_id: 1 },
            { name: 'JavaScript', term_id: 2 },
            { name: 'Humildade', term_id: 1 },
            { name: 'Planejamento', term_id: 2 },
            { name: 'Autoconfiança', term_id: 3 },
            { name: 'React', term_id: 3 },
        ]
    });

    await prisma.teacherDiscipline.createMany({
        data: [
            {teacher_id: 1, discipline_id: 1},
            {teacher_id: 1, discipline_id: 2},
            {teacher_id: 1, discipline_id: 3},
            {teacher_id: 2, discipline_id: 4},
            {teacher_id: 2, discipline_id: 5},
            {teacher_id: 2, discipline_id: 6}
        ]
    });

    const user = await prisma.user.create({
        data: {email: 'admin@admin.com', password: bcrypt.hashSync('admin', 10)}
    });

    await prisma.test.createMany({
        data: [
            {name: 'teste1', link: 'link1', author_id: user.id, teacher_id: 1, category_id: 1, discipline_id: 1},
            {name: 'teste2', link: 'link2', author_id: user.id, teacher_id: 1, category_id: 1, discipline_id: 2},
            {name: 'teste3', link: 'link3', author_id: user.id, teacher_id: 1, category_id: 1, discipline_id: 2},
            {name: 'teste4', link: 'link4', author_id: user.id, teacher_id: 2, category_id: 2, discipline_id: 4},
            {name: 'teste5', link: 'link5', author_id: user.id, teacher_id: 2, category_id: 2, discipline_id: 4},
            {name: 'teste6', link: 'link6', author_id: user.id, teacher_id: 2, category_id: 2, discipline_id: 5}
        ]
    });
}


populateDB().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});