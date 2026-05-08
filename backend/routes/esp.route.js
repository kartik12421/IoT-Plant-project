import express, { Router } from "express";
import { AIPredictController } from "../controllers/ai.controller.js";
import upload from "../middleware/multer.js";
import { esp2Controller } from "../controllers/esp.controller.js";

const espRouter = express.Router();

espRouter.post("/esp-data",  esp2Controller   )
// espRouter.get(
//   "/sensor",
//   getSensorData
// );



export default espRouter
