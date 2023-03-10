import { PrismaClient } from "@prisma/client";

export type User = {
  id: number;
  email: string;
  name: string | null;
  type: number;
};

export default class UserStore {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(
    email: string,
    password: string,
    name?: string
  ): Promise<number> {

    if (email.length == 0 || password.length == 0) {
      return -1;
    }

    const email_count = await this.prisma.user.count({ where: { email } });
    if (email_count > 0) {
      // User already exists...
      return -1;
    }

    const created_user = await this.prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    if (created_user)
      return created_user.id;
    else
      return -1;
  }

  async getByID(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user) {
      const { id, email, name, type } = user;
      return { id, email, name, type };
    } else {
      return null;
    }
  }
}
