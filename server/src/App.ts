import Express from 'express'
import UserStore from './stores/UserStore';

export default function (database: UserStore) {

    const app = Express();

    app.use(Express.json());

    app.get("/", (req, res) => {
        res.send("<h1>Are you supposed to be here?</h1>");
    });

    app.post("/user", async (req, res) => {
        const { email, password, name } = req.body;

        if (!email || !password) {
            res.sendStatus(400);
            return;
        }

        const userId = await database.create( email, password, name);

        res.send({
            userId:userId,
        });
    });

    return app;
}