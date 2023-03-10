import makeApp from "./App"
import { makeDataSource, makeDataStore } from "./stores/DataSource";

const PORT = process.env.PORT || 8081;

const dataSource = makeDataSource();
const dataStore = makeDataStore(dataSource);
const app = makeApp(dataStore);

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));