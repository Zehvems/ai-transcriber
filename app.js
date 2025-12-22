import { errStatus, fileInfo, setStatus, setTranscript } from "./ui.js";
import { fakeFetch, checkStatus } from "./api.js";
const form = document.getElementById("transcribe-form");
const input = document.getElementById("input");
const btn = document.getElementById("btn");
let file = undefined;
let result = undefined;
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
  console.log(formData.get("file"));
  setStatus("Processing...");
  try {
    result = await fakeFetch(formData);
    if (result.ok !== true) {
      setStatus("Error (backend res status)");
    } else {
      setTranscript(result.text);
      setStatus("Gotowe (mock – brak prawdziwego backendu)");
    }
  } catch {
    errStatus("Transcription failed – network error");
    setTranscript("");
    return;
  } finally {
    btn.disabled = false;
  }
});
