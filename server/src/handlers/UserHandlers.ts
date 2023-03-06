import { Request, Response } from "express";
import Joi from "joi";
import { UserStore } from "../stores/UserStore";
import { Context } from "../Context";

export class UserHandlers {
  static GetUserByID(ctx: Context, req: Request, res: Response) {
    const schema = Joi.object({
      id: Joi.number().min(0).integer().exist(),
    });

    try {
      const result = schema.validate(req.params);
      const id: number = result.value.id;

      console.log("Seemed to validate...");

      const user = UserStore.GetByID(ctx, id);

      res.json(user);
    } catch (err) {
        console.log("Seemed not to validate...");
      res.json({});
    }
  }
}
