const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("zTranscriber backend alive");
});
app.post("/api/transcribe", (req, res) => {
  res.send("Status ok!");
});
app.get("/status", (req, res) => {
  res.json({ alive: true, version: "1.0" });
});
app.listen(3000, () => {
  console.log("Backend on http://localhost:3000");
});
