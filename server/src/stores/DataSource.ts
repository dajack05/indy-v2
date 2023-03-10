import { PrismaClient } from "@prisma/client"
import {mockDeep} from "jest-mock-extended"

export function makeDataSource(){
    return new PrismaClient();
}

export function makeMockDataSource(){
    return mockDeep<PrismaClient>();
}