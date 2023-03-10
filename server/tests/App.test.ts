import supertest from "supertest"
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { DataStore } from "../src/stores/DataSource"
import makeApp from "../src/App"
import { Driver } from "../src/stores/DriverStore";

let mockDataStore: DeepMockProxy<DataStore> = mockDeep<DataStore>();
const app = makeApp(mockDataStore);

describe("POST /users", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("Given a username and password", () => {

        test("Should write new user to DB", async () => {
            const combos = [
                { email: "email1", password: "password1", name: "name1" },
                { email: "email2", password: "password2", name: "name2" },
                { email: "email3", password: "password3", name: "name3" },
            ]

            for (const combo of combos) {
                mockDataStore.users.create.mockReset();

                const response = await supertest(app).post("/user").send(combo);

                expect(mockDataStore.users.create.mock.calls.length).toBe(1);
                expect(mockDataStore.users.create.mock.calls[0][0]).toBe(combo.email);
                expect(mockDataStore.users.create.mock.calls[0][1]).toBe(combo.password);
                expect(mockDataStore.users.create.mock.calls[0][2]).toBe(combo.name);
            }
        })

        test("Should return user with matching info", async () => {

            for (let i = 0; i < 10; i++) {
                mockDataStore.users.create.mockResolvedValue(i);

                const response = await supertest(app).post("/user").send({ email: "email", password: "password" });

                expect(response.body.userId).toBe(i);
            }
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
            mockDataStore.users.create.mockResolvedValue(1);

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

describe("POST /driver", () => {

    test("Should return 400 when missing/invalid name", async () => {
        const bad_inputs = [
            {},
            { name: "" },
            { name: 2 },
        ];

        for (const input of bad_inputs) {
            const response = await supertest(app).post("/driver").send(input);
            expect(response.statusCode).toBe(400);
        }
    })

    test("Should return 200 status when valid name given", async () => {
        mockDataStore.drivers.create.mockResolvedValue(2);
        const response = await supertest(app).post("/driver").send({ name: "Test McTesterson" });
        expect(response.statusCode).toBe(200);
    })

    test("Should return Driver ID when valid name given", async () => {
        for (let i = 0; i < 10; i++) {
            mockDataStore.drivers.create.mockResolvedValue(i);
            const response = await supertest(app).post("/driver").send({ name: "Test McTesterson" });
            expect(response.body.driverId).toBe(i);
        }
    })

})

describe("GET /driver", () => {

    test("Should return 200", async () => {
        mockDataStore.drivers.getAll.mockResolvedValue([]);
        const response = await supertest(app).get("/driver").send();
        expect(response.statusCode).toBe(200);
    })

    test("Should return json", async () => {
        mockDataStore.drivers.getAll.mockResolvedValue([]);
        const response = await supertest(app).get("/driver").send();
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    })

    test("Should return all drivers", async () => {
        const all_drivers: Driver[] = [
            { id: 0, name: "Fake Name 1", photo_url: "Fake Photo 1" },
            { id: 1, name: "Fake Name 2", photo_url: "Fake Photo 2" },
            { id: 2, name: "Fake Name 3", photo_url: "Fake Photo 3" },
            { id: 3, name: "Fake Name 4", photo_url: "Fake Photo 4" },
        ];
        mockDataStore.drivers.getAll.mockResolvedValue(all_drivers);
        const response = await supertest(app).get("/driver").send();
        expect(response.body.drivers).toStrictEqual(all_drivers);
    })

})