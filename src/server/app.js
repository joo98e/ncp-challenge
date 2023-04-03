import rootRouter from "./routes/rootRouter";
import getConfiguredApp from "./config/getConfiguredApp";

const app = getConfiguredApp();

app.use("/", rootRouter);

export default app;
