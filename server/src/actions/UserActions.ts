import { Context } from "../Context";
import { CreateUserParams, User } from "../stores/UserStore";


export class UserActions {

    static async Create(ctx: Context, params: CreateUserParams): Promise<User> {
        return UserActions.Create(ctx, params);
    }

    static async Delete() {

    }

    static async Update() {

    }

    static async GetByID() {

    }

    static async GetByEmail() {

    }
}