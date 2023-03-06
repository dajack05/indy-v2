import { Request, Response } from "express";
import Joi from "joi";
import { UserStore } from "../stores/UserStore";
import { Context } from "../Context";

export class UserHandlers {
    static GetUserByID(ctx:Context, req: Request, res: Response) {
        const schema = Joi.object({
            id: Joi.number().min(0).integer()
        });
        
        const {error, value} = schema.validate(req.params);
        if (error != undefined || value.id == undefined) {
            console.error(error);
            res.send("");
            return;
        }

        const id:number = value.id;

        const user = UserStore.GetByID(ctx, id);
        
        res.json(user)
    }
}