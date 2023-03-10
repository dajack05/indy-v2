import supertest from "supertest"
import makeApp from "../src/App"
import UserStore, { CreateUserParams, User } from "../src/stores/UserStore"

const mockCreateUser = jest.fn();

const app = makeApp({
    create: mockCreateUser,
} as unknown as UserStore);

describe("POST /users", () => {

    beforeEach(() => {
        mockCreateUser.mockReset();
    })

    describe("Given a username and password", () => {

        test("Should write new user to DB", async () => {
            const combos = [
                { email: "email1", password: "password1", name: "name1" },
                { email: "email2", password: "password2", name: "name2" },
                { email: "email3", password: "password3", name: "name3" },
            ]

            for (const combo of combos) {
                mockCreateUser.mockReset();

                const response = await supertest(app).post("/user").send(combo);

                expect(mockCreateUser.mock.calls.length).toBe(1);
                expect(mockCreateUser.mock.calls[0][0]).toBe(combo.email);
                expect(mockCreateUser.mock.calls[0][1]).toBe(combo.password);
                expect(mockCreateUser.mock.calls[0][2]).toBe(combo.name);
            }
        })

        test("Should return user with matching info", async () => {

            mockCreateUser.mockResolvedValue(1);
            
            const response = await supertest(app).post("/user").send({ email:"email", password:"password" });

            expect(response.body.userId).toBe(1);
        })

        test("Should return status 200", async () => {
            const response = await supertest(app).post("/user").send({
                email: "email",
                password: "password",
                name: "name",
            });

            expect(response.statusCode).toBe(200);
        })

        test("Should return with content-type JSON", async () => {
            const response = await supertest(app).post("/user").send({
                email: "email",
                password: "password",
                name: "name",
            });

            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        })

        test("Should return a user ID", async () => {
            mockCreateUser.mockResolvedValue(1);
            
            const response = await supertest(app).post("/user").send({
                email: "email",
                password: "password",
                name: "name",
            });

            expect(response.body.userId).toBeDefined();
        })

    })


    describe("Given missing username and password", () => {

        test("Should send status code 400", async () => {
            const params = [
                { email: "email" },
                { password: "password" },
                {},
            ];

            for (const param of params) {
                const response = await supertest(app).post("/user").send(param);
                expect(response.statusCode).toBe(400);
            }
        })

    })

})