import express, { Router } from "express";
import { AIPredictController } from "../controllers/ai.controller.js";
import upload from "../middleware/multer.js";

const aiRouter = express.Router();

aiRouter.post("/predict",  upload.single("image") ,   AIPredictController)



export default aiRouter
