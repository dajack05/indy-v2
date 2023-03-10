import makeApp from "./App"
import UserStore from "./stores/UserStore";

const PORT = process.env.PORT || 8081;

const userStore = new UserStore();
const app = makeApp(userStore);

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));