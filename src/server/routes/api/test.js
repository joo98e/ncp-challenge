import getTestApi from "@controllers/api/TestController";

const express = require("express");

const TestRoute = express.Router();

TestRoute.get("/", getTestApi);

export default TestRoute;
