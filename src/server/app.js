import express from "express";
import rootRouter from "./routes/rootRouter";
import getConfiguredApp from "./config/getApp";

const app = getConfiguredApp();

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));

app.use("/", rootRouter);

export default app;
