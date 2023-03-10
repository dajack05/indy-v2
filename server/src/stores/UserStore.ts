import { PrismaClient } from "@prisma/client";

export type User = {
  id: number;
  email: string;
  name: string;
  type: number;
};

export interface UpdateUserParams {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  type?: number;
}

export interface CreateUserParams {
  name?: string;
  email: string;
  password: string;
}

export default class UserStore {
  private prisma = new PrismaClient();

  async create(
    email: string,
    password: string,
    name?: string
  ): Promise<number> {
    const created_user = await this.prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    return created_user.id;
  }

  async update(params: UpdateUserParams): Promise<User> {
    const updated_user = await this.prisma.user.update({
      where: { id: params.id },
      data: params,
    });
    return {
      id: updated_user.id,
      name: updated_user.name || "",
      email: updated_user.email,
      type: updated_user.type,
    };
  }

  async getByID(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user === null) {
      return null;
    } else {
      return {
        id: user.id,
        email: user.email,
        name: user.name || "",
        type: user.type,
      };
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user === null) {
      return null;
    } else {
      return {
        id: user.id,
        email: user.email,
        name: user.name || "",
        type: user.type,
      };
    }
  }
}
