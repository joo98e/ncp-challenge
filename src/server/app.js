import rootRouter from "./routes/rootRouter";
import getConfiguredApp from "./config/getApp";

const app = getConfiguredApp();

app.use("/", rootRouter);

export default app;
