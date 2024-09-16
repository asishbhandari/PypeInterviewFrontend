import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const [context, setContext] = useState("");
  let socket = io("http://localhost:4000");

  const handleSubmit = () => {
    socket.emit("message", context);
  };

  useEffect(() => {
    if (socket.active) {
      socket.on("connect", () => {
        console.log(socket.id);
      });
      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
    return () => socket.close();
  }, []);

  useEffect(() => {
    if (socket.active) {
      socket.on("messageReceived", (message) => {
        setContext(message);
        console.log("inside on event message: ", message);
      });
    }
  });

  return (
    <div>
      <h2>Text Are</h2>
      <textarea
        name="editor"
        id="editor"
        style={{ width: "400px", height: "200px" }}
        value={context}
        onChange={(e) => setContext(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>on submit</button>
    </div>
  );
}

export default App;
