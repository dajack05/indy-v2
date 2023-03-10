import { PrismaClient } from "@prisma/client";

export type Driver = {
    id: number;
    name: string;
    photo_url: string;
}

export class DriverStore {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async create(name: string, photo_url: string): Promise<number> {

        if (name.length <= 0) {
            return -1;
        }

        const count = await this.prisma.driver.count({ where: { name } });
        if (count > 0) {
            return -1;
        }

        const driver = await this.prisma.driver.create({
            data: {
                name,
                photo_url,
            }
        });

        return driver.id;
    }

    async getByID(id: number): Promise<Driver | null> {
        const driver = await this.prisma.driver.findUnique({ where: { id } });
        if (driver) {
            return {
                id: driver.id,
                name: driver.name,
                photo_url: driver.photo_url,
            };
        } else {
            return null;
        }
    }
}