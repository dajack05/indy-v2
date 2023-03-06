import Express from "express";
import { UserHandlers } from "./handlers/UserHandlers";

const app = Express();

const PORT = process.env.PORT || 8081;

app.get("/", (req, res) => {
    res.send("<h1>Are you supposed to be here?</h1>");
});

app.get("/user", UserHandlers.GetUserByID);

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));