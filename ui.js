export function setStatus(text) {
  document.getElementById("status").innerText = text;
}
export function setTranscript(text) {
  document.getElementById("transcript").textContent = text;
}
export function fileInfo(file) {
  document.getElementById("file-info").textContent = `File: ${file.name} ${(
    file.size / 1024
  ).toFixed(1)} KB, ${file.type}`;
}
