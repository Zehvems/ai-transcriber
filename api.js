export function fakeFetch(formData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) reject(new Error("Błąd sieci."));
      resolve({ text: "Mock Tranksrypcja" });
    }, 700);
  });
}
