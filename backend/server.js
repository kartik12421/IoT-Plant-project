// const express = require("express");
// const cors = require("cors");
import express from "express"
import cors from "cors"
import aiRouter from "./routes/ai.route.js";

import espRouter from "./routes/esp.route.js";
import connectDB from "./db/db.js";
import voiceRouter from "./routes/voice.route.js";
import dotenv from "dotenv"
dotenv.config()


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {

  res.send("Backend Working");
});


app.use("/api/ai", aiRouter)
app.use("/api/esp", espRouter);
app.use("/api/voice", voiceRouter);

app.listen(5000, "0.0.0.0", () => {
  connectDB();

  console.log(
    "Server running on port 5000"
  );
});
