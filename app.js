import { fileInfo, setStatus, setTranscript } from "./ui.js";
const form = document.getElementById("transcribe-form");
const input = document.getElementById("input");
let file = null;
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

  const formData = new FormData();
  formData.append("file", file);

  console.log(formData.get("file"));
  setStatus("Gotowy do wysłania (mock)");
  setTranscript("...");
});
