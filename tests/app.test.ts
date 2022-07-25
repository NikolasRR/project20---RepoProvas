import supertest from "supertest";
import { faker } from "@faker-js/faker";
import "dotenv/config";

import app from "../src/app.js";
import { prisma } from "../src/database/db.js";

const login = {
    email: faker.internet.email(),
    password: faker.internet.password()
}
let token;

console.log(`running on ${process.env.DATABASE_URL}`);


afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE terms RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE teachers RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE categories RESTART IDENTITY CASCADE`;
  });

describe('signup and then signin receiving token', () => {

    it('given valid email and password it should sign up', async () => {

        const response = await supertest(app).post("/sign-up").send(login);
        expect(response.statusCode).toBe(201);
    });

    it('created user should persist', async () => {
        const userOnDB = await prisma.user.findFirst({ where: { email: login.email } });
        expect(userOnDB).not.toBeNull();
    })

    it('given already registered email it should fail', async () => {

        const response = await supertest(app).post("/sign-up").send(login);
        expect(response.statusCode).toBe(409);
    });

    it('given unvalid email it should fail w/ 422', async () => {

        const failLogin = {
            email: 'some@',
            password: '1234'
        }
        const response = await supertest(app).post("/sign-up").send(failLogin);
        expect(response.statusCode).toBe(422);
    });

    it('given password as empty string it should fail w/ 422', async () => {

        const failLogin = {
            email: 'some@',
            password: ''
        }
        const response = await supertest(app).post("/sign-up").send(failLogin);
        expect(response.statusCode).toBe(422);
    });

    it('given registered email and correct password it should login and return token', async () => {

        const response = await supertest(app).post("/sign-in").send(login);
        token = response.body.token;
        expect(response.body.token).not.toBeNull();
    });
})

describe('get requests on routes /tests and /categories', () => {
    it('get request on route /tests?groupBy=disciplines', async () => {
        const response = await supertest(app)
            .get("/tests?groupBy=disciplines")
            .set('Authorization', `Bearer ${token}`);

        expect(response.body).not.toBeNull();
        expect(response.body).not.toBe({});
    });

    it('get request on route /tests?groupBy=teachers', async () => {
        const response = await supertest(app)
            .get("/tests?groupBy=teachers")
            .set('Authorization', `Bearer ${token}`);

        expect(response.body).not.toBeNull();
        expect(response.body).not.toBe({});
    });

    it('get request on route /tests without groupBy clause should fail',async () => {
        const response = await supertest(app)
            .get("/tests?groupBy=")
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(422);
    });

    it('get request on route /categories', async () => {
        const response = await supertest(app)
            .get("/categories")
            .set('Authorization', `Bearer ${token}`);

        expect(response.body).not.toBeNull();
        expect(response.body).not.toBe({});
    });

    it('get request on route without token should fail', async () => {
        const response = await supertest(app)
            .get("/categories")

        expect(response.statusCode).toBe(422);
    });
})

describe('try to add a new test', () => {
    it('given valid information should create test and persist', async () => {
        const test = {
            name: "teste adicionado automaticamente 1",
            link: "https://something2.com",
            teacher_id: 1,
            category_id: 1,
            discipline_id: 1
        }
        const response = await supertest(app)
            .post('/tests')
            .send(test)
            .set('Authorization', `Bearer ${token}`);
        
        console.log(response.error.text);
        
        expect(response.statusCode).toBe(201);

        const persistedTest = await prisma.test.findFirst({ where: { link: test.link } });
        expect(persistedTest).not.toBeNull();
    });

    it('given not registered teacher/discipline/category should fail', async () => {
        const test = {
            name: "teste adicionado automaticamente 1",
            link: "https://something3.com",
            teacher_id: 1,
            category_id: 1,
            discipline_id: 9
        }
        const response = await supertest(app)
            .post('/tests')
            .send(test)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);
    });

    it('given already registered link should fail', async () => {
        const test = {
            name: "teste adicionado automaticamente 1",
            link: "https://something2.com",
            teacher_id: 1,
            category_id: 1,
            discipline_id: 1
        }
        const response = await supertest(app)
            .post('/tests')
            .send(test)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(409);
    });
})