export function fakeFetch(formData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) reject(new Error("Błąd sieci."));
      resolve({ ok: false, text: "Mock Tranksrypcja" });
    }, 700);
  });
}
export async function checkStatus() {
  const res = await fetch("http://localhost:3000/status");
  if (!res.ok) throw new Error("Błąd.");
  return await res.json();
}
