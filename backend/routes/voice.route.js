import mongoose from "mongoose";
import express from "express";
import { chat } from "../controllers/voice.controller.js";

const voiceRouter = express.Router();

voiceRouter.post("/chat",  chat )



export default voiceRouter;