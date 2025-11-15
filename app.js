import { fileInfo, setStatus, setTranscript } from "./ui.js";
const form = document.getElementById("transcribe-form");
const input = document.getElementById("input");
const btn = document.getElementById("btn");
let file = undefined;
setTranscript("Waiting for file...");
input.addEventListener("change", () => {
  if (input.files[0]) {
    file = input.files[0];
    setStatus("File injected!");
    fileInfo(file);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.files[0]) {
    setStatus("File missing!");
    return;
  }
  btn.disabled = true;
  // TODO: tutaj później wejdzie fetch("/api/transcribe", { method: "POST", body: formData })
  const formData = new FormData();
  formData.append("file", file);

  console.log(formData.get("file"));

  setTimeout(() => {
    setStatus("Przetważanie...");
  }, 1200);

  setTimeout(() => {
    setStatus("Gotowe (mock – brak prawdziwego backendu)");
    setTranscript("...");
    btn.disabled = false;
  }, 2400);
});
