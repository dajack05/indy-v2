import { PrismaClient } from "@prisma/client"
import {mockDeep} from "jest-mock-extended"
import env from "dotenv"

export function makeDataSource(){
    env.config();
    return new PrismaClient({datasources:{db:{url:process.env.DATABASE_URL}}});
}

export function makeMockDataSource(){
    return mockDeep<PrismaClient>();
}