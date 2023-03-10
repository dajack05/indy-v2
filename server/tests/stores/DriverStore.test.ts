import { PrismaClient, Driver as DBDriver } from "@prisma/client";
import { makeMockDataSource } from "../../src/stores/DataSource";
import { DeepMockProxy } from "jest-mock-extended";
import { DriverStore } from "../../src/stores/DriverStore";

let prisma: DeepMockProxy<PrismaClient>;
let store: DriverStore;

describe("DriverStore -> Prisma", () => {

    beforeEach(() => {
        prisma = makeMockDataSource();
        store = new DriverStore(prisma);
        jest.clearAllMocks();
    });

    describe("Create Driver", () => {

        test("Should return driver ID when creating new driver", async () => {
            for (let i = 0; i < 10; i++) {
                prisma.driver.create.mockResolvedValue({
                    id: i,
                    name: "",
                    draftOrderId: null,
                    raceId: null,
                    photo_url: "",
                });

                const result = await store.create("Driver Name", `https://picsum.photos/200?${i}`);

                expect(result).toBe(i);
            }
        })

        test("Should return -1 when driver is missing name", async () => {
            const result = await store.create("", "");
            expect(result).toBe(-1);
        })

        test("Should return -1 when driver already exists", async () => {
            prisma.driver.count.mockResolvedValue(1);
            const result = await store.create("Existing Driver", "");
            expect(result).toBe(-1);
        })

    })

    describe("Get Driver by ID", () => {

        test("Should return driver with valid ID", async () => {
            const name = "Test McTesterson";
            prisma.driver.findUnique.mockResolvedValue({
                id: 0,
                name,
                draftOrderId: null,
                photo_url: "",
                raceId: null,
            });

            const result = await store.getByID(0);

            expect(result).toStrictEqual({
                id: 0,
                name,
                photo_url:""
            });
        })

        test("Should return null with invalid ID", async () => {
            prisma.driver.findUnique.mockResolvedValue(null);

            const result = await store.getByID(0);

            expect(result).toBeNull();
        })

    })

})