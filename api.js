export function fakeFetch(formData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ text: "Mock Tranksrypcja" });
    }, 2000);
  });
}
