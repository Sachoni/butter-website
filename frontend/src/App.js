import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    try {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error("Error fetching API:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Butter Website</h1>
      <button onClick={fetchMessage} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Get API Message
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;