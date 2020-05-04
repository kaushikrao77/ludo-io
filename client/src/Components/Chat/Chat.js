import React, { useState, useEffect } from "react";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import "./Chat.css";

function Chat({ socket }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    //adds new messages to messages array
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    //sets the name of the player
    socket.on("name", (tempName) => {
      setName(tempName);
    });
  }, []);

  //sends the new message to server
  function sendMessage(event) {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
