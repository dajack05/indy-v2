import { Context } from "../Context";

type User = {
  id: number;
  email: string;
  name: string;
  type: number;
};

export class UserStore {
  static async Create(
    ctx: Context,
    email: string,
    password: string,
    name: string
  ): Promise<User> {
    
    try {
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
    } catch (err) {
      console.error(err);
    }
    return {
      email: "",
      id: -1,
      name: "",
      type: -1,
    };
  }
}
