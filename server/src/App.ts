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

    app.post("/driver", async (req, res) => {
        const { name, photo_url } = req.body;

        if (!name || typeof (name) != "string") {
            res.sendStatus(400);
            return;
        }

        const driverId = await store.drivers.create(name, photo_url || "");

        if (driverId < 0) {
            res.sendStatus(400);
            return;
        }

        res.send({ driverId });
    });

    app.get("/driver", async (req, res) => {
        const { id } = req.query;
        if (id) {
            const id_num = Number.parseInt(id.toString());
            if (isNaN(id_num)) {
                res.sendStatus(400);
                return;
            }

            // Get By ID
            const driver = await store.drivers.getByID(id_num);
            if (!driver) {
                res.sendStatus(400);
                return;
            }

            res.send(driver);
        } else {
            const drivers = await store.drivers.getAll();
            res.send({ drivers });
        }
    });

    return app;
}