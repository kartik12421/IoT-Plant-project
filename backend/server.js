// const express = require("express");
// const cors = require("cors");
import express from "express"
import cors from "cors"
import aiRouter from "./routes/ai.route.js";
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

// app.get("/sensor", (req, res) => {
//   res.json({
//     moisture: 65,
//     temperature: 28,
//     humidity: 72,
//     pump: true,
//   });
// });

app.use("/api/ai", aiRouter)

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
