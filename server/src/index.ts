import makeApp from "./App"
import { makeDataSource } from "./stores/DataSource";
import UserStore from "./stores/UserStore";

const PORT = process.env.PORT || 8081;

const dataSource = makeDataSource();
const userStore = new UserStore(dataSource);
const app = makeApp(userStore);

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));