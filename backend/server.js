const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("zTranscriber backend alive");
});
app.post("/api/transcribe", (req, res) => {
  res.json({ ok: true, text: "..." });
});
app.get("/status", (req, res) => {
  res.json({ alive: true, version: "1.0" });
});
app.listen(3000, () => {
  console.log("Backend on http://localhost:3000");
});
