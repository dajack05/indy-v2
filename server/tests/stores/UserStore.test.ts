import { PrismaClient, User as DBUser } from "@prisma/client";
import { makeMockDataSource } from "../../src/stores/DataSource";
import UserStore, { User } from "../../src/stores/UserStore";
import { DeepMockProxy } from "jest-mock-extended";

let prisma: DeepMockProxy<PrismaClient>;
let store: UserStore;

describe("UserStore -> Prisma", () => {

    beforeEach(() => {
        prisma = makeMockDataSource();
        store = new UserStore(prisma);
        jest.clearAllMocks();
    });

    describe("Create User", () => {

        test("Should return -1 if email or password are invalid", async () => {
            const inputs = [
                { email: "", password: "password" },
                { email: "email", password: "" },
                { email: "", password: "" },
            ];

            for (const input of inputs) {
                const userId = await store.create(input.email, input.password);

                expect(prisma.user.create).not.toBeCalled();
                expect(userId).toBe(-1);
            }
        })

        test("Should return -1 if email is already in use", async () => {
            prisma.user.count.mockResolvedValue(1);

            const userId = await store.create("email", "password");

            expect(prisma.user.count).toBeCalledTimes(1);
            expect(prisma.user.create).toBeCalledTimes(0);
            expect(userId).toBe(-1);
        });

        test("Should return user ID", async () => {
            for (let i = 0; i < 10; i++) {
                prisma.user.create.mockResolvedValue({
                    id: i,
                    email: "",
                    password: "",
                    name: "",
                    type: 0,
                });

                const userId = await store.create("email", "password", "name");

                expect(userId).toBe(i);
            }
        });

    })

    describe("Get User by ID", () => {
        test("Invalid ID returns NULL", async () => {
            prisma.user.findUnique.mockResolvedValue(null);

            const user = await store.getByID(1);

            expect(user).toBe(null);
        })

        test("Valid ID returns User", async () => {
            const template_user: DBUser = {
                id: 1,
                email: "email",
                name: "name",
                password: "password",
                type: 1,
            };

            const safe_user: User = {
                id: template_user.id,
                email: template_user.email,
                name: template_user.name,
                type: template_user.type,
            }

            prisma.user.findUnique.mockResolvedValue(template_user);

            const user = await store.getByID(1);

            expect(user).toStrictEqual(safe_user);
        })
    })
})