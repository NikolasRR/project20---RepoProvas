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

// afterAll(async () => {
//   await prisma.$executeRaw`
//   TRUNCATE TABLE tests;
//   `;
// });

describe('signup and then signin receiving token', () => {
    
    it('given valid email and password it should sign up', async () => {

        const response = await supertest(app).post("/sign-up").send(login);
        expect(response.statusCode).toBe(201);
    })
    
    it('created user should persist', async () => {
        const userOnDB = await prisma.user.findFirst({ where: { email: login.email } });
        expect(userOnDB).not.toBeNull();
    })

    it('given already registered email it should fail', async () => {

        const response = await supertest(app).post("/sign-up").send(login);
        expect(response.statusCode).toBe(409);
    })

    it('given unvalid email it should fail w/ 422', async () => {

        const failLogin = {
            email: 'some@',
            password: '1234'
        }
        const response = await supertest(app).post("/sign-up").send(failLogin);
        expect(response.statusCode).toBe(422);
    })

    it('given password as empty string it should fail w/ 422', async () => {

        const failLogin = {
            email: 'some@',
            password: ''
        }
        const response = await supertest(app).post("/sign-up").send(failLogin);
        expect(response.statusCode).toBe(422);
    })

    it('given registered email and correct password it should login and return token', async () => {

        const response = await supertest(app).post("/sign-up").send(login);
        token = response.body.token;
        expect(response.body.token).not.toBeNull();
    })
})

describe('get requests on routes /tests and /categories', () => {
    it('get request on route /tests?groupBy=disciplines',async () => {
        const response = await supertest(app)
        .get("/tests?groupBy=disciplines")
        .send(login)
        .set('Authorization', `Bearer ${token}`);
        
        expect(response.body).not.toBe({});
    })
})