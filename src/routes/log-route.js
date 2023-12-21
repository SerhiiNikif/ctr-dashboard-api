import express from "express";

import logController from "../controllers/log-controller.js";
import ctrlWrapper from '../middlewares/ctrlWrapper.js';

const router = express.Router();

// Route for retrieving log data for a specific day.
router.get("/day", ctrlWrapper(logController.dataPerDay));
// Route for retrieving log data for a specific period.
router.get("/period", ctrlWrapper(logController.dataForPeriod));

export default router;
