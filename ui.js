const status = document.getElementById("status");
export function setStatus(text) {
  status.innerText = text;
  status.className = "ok";
}
export function errStatus(err) {
  status.innerText = err;
  status.className = "err";
}
export function setTranscript(text) {
  document.getElementById("transcript").textContent = text;
}
export function fileInfo(file) {
  document.getElementById("file-info").textContent = `File: ${file.name} ${(
    file.size / 1024
  ).toFixed(1)} KB, ${file.type}`;
}
