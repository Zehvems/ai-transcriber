import { useState } from "react";

function App() {
  const [status, setStatus] = useState("idle");

  return (
    <div>
      <h1>AI Transcriber</h1>
      <p>Status: {status}</p>
      <button onClick={() => setStatus("clicked")}>Test</button>
    </div>
  );
}

export default App;
