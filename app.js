import { setStatus, setTranscript } from "./ui.js";
const form = document.getElementById("transcribe-form");
const input = document.getElementById("input");
let file = null;

input.addEventListener("change", () => {
  if (input.files[0]) {
    file = input.files[0];
    setStatus("File injected!");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.files[0]) setStatus("File missing!");
  else setStatus("Gotowy do wysłania (mock)");
  console.log("Submit:", file);
});
