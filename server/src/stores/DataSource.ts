import { PrismaClient } from "@prisma/client"
import {mockDeep} from "jest-mock-extended"

export function makeDataSource(){
    console.log(process.env.DATABASE_URL);
    return new PrismaClient();
}

export function makeMockDataSource(){
    return mockDeep<PrismaClient>();
}