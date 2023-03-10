import Express from 'express'
import { DataStore } from './stores/DataSource';

export default function (store: DataStore) {

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

        const userId = await store.users.create(email, password, name);

        res.send({ userId });
    });

    return app;
}