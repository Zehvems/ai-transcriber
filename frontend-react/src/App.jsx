import { useState } from "react";

function StatusPanel({ statusText, onCheck, loading, error }) {
  return (
    <div>
      <p>Status: {statusText}</p>
      <button onClick={onCheck} disabled={loading}>
        Check backend
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

function TranscriptBox({ transcript }) {
  return (
    <div>
      <h3>Transcript</h3>
      <pre>{transcript || "(empty)"}</pre>
    </div>
  );
}

function App() {
  const [statusText, setStatusText] = useState("not checked");
  const [transcript, setTranscript] = useState("");
  const [backend, setBackend] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setLoading(true);
    setError(null);
    setStatusText("checking...");
    try {
      const res = await fetch("http://localhost:3000/status");
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      setBackend(data);
      setStatusText("online");
      setTranscript(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err.message);
      setStatusText("offline");
      setTranscript("");
      setBackend(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>AI Transcriber</h1>
      <StatusPanel statusText={statusText} onCheck={handleCheck} />
      <TranscriptBox transcript={transcript} />
    </div>
  );
}

export default App;
