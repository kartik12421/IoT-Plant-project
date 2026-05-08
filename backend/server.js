const express = require("express");
const cors = require("cors");
 
const app = express();

app.use(cors());

app.get("/sensor", (req, res) => {
  res.json({
    moisture: 65,
    temperature: 28,
    humidity: 72,
    pump: true,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
