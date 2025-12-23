import { errStatus, fileInfo, setStatus, setTranscript } from "./ui.js";
import { fakeFetch, checkStatus } from "./api.js";
const form = document.getElementById("transcribe-form");
const input = document.getElementById("input");
const btn = document.getElementById("btn");
let file = undefined;
let result = undefined;

async function transcribe(formData) {
  const res = await fetch("http://localhost:3000/api/transcribe", {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const data = await res.json();
    if (data.ok === true) {
      setTranscript(data.text);
      setStatus("Done");
    } else {
      throw new Error("Backend ok=false");
    }
  } else {
    throw new Error("HTTP not ok");
  }
}
setTranscript("Waiting for file...");
try {
  const data = await checkStatus();
  setTranscript(JSON.stringify(data, null, 2));
  setStatus("Backend Alive.");
} catch (error) {
  errStatus("Backend offline");
}
input.addEventListener("change", () => {
  if (input.files[0]) {
    file = input.files[0];
    setStatus("File injected!");
    fileInfo(file);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!input.files[0]) {
    errStatus("File missing!");
    return;
  }
  btn.disabled = true;
  // TODO: tutaj później wejdzie fetch("/api/transcribe", { method: "POST", body: formData })
  const formData = new FormData();
  formData.append("file", file);

  setStatus("Processing...");
  try {
    await transcribe(formData);
  } catch (error) {
    errStatus(error.message);
    setTranscript("");
    return;
  } finally {
    btn.disabled = false;
  }
});
