import express from "express";
import logRoutes from "./routes/log-route.js";
import apiErrorHandler from './middlewares/apiErrorHandler.js';

const app = express();

app.use(express.json());

app.use('/', logRoutes);

app.use(apiErrorHandler);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" })
});

export default app;