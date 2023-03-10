import { PrismaClient } from "@prisma/client"
import { mockDeep } from "jest-mock-extended"
import env from "dotenv"
import UserStore from "./UserStore";
import { DriverStore } from "./DriverStore";

export function makeDataSource() {
    env.config();
    return new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });
}

export function makeMockDataSource() {
    return mockDeep<PrismaClient>();
}

export type DataStore = {
    users: UserStore,
    drivers: DriverStore,
}

export function makeDataStore(dataSource: PrismaClient): DataStore {
    return {
        drivers: new DriverStore(dataSource),
        users: new UserStore(dataSource),
    }
}