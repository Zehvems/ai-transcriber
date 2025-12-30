const multer = require("multer");
const express = require("express");
const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const OpenAI = require("openai");
const { toFile } = require("openai");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("zTranscriber backend alive");
});
app.post("/api/transcribe", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: "No file" });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ ok: false, error: "Missing OPENAI_API_KEY" });
  }
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const file = await toFile(req.file.buffer, req.file.originalname);

    const transcript = await client.audio.transcriptions.create({
      model: "whisper-1",
      file,
    });

    return res.json({ ok: true, text: transcript.text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Whisper failed" });
  }
});

app.get("/status", (req, res) => {
  res.json({ alive: true, version: "1.0" });
});
app.listen(3000, () => {
  console.log("Backend on http://localhost:3000");
});
