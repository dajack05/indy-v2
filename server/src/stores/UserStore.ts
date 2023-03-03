import { Context } from "../Context";

type User = {
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

export class UserStore {
  static async Create(
    ctx: Context,
    email: string,
    password: string,
    name: string
  ): Promise<User> {
    const created_user = await ctx.prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    return {
      id: created_user.id,
      email: created_user.email,
      name: created_user.name || "",
      type: created_user.type,
    };
  }

  static async Update(ctx: Context, params: UpdateUserParams): Promise<User> {
    const updated_user = await ctx.prisma.user.update({
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

  static async GetByID(ctx: Context, id: number): Promise<User | null> {
    const user = await ctx.prisma.user.findUnique({ where: { id } });
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
