import { PrismaClient, Driver as DBDriver } from "@prisma/client";

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

    async getAll(): Promise<Driver[]> {
        const drivers:DBDriver[] = await this.prisma.driver.findMany();
        const mapped_drivers = drivers.map(d => ({ id: d.id, name: d.name, photo_url: d.photo_url } as Driver));
        return mapped_drivers;
    }
}