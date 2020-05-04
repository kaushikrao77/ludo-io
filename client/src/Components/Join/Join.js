import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./Join.css";

function Join({ socket, history }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  let uid = uuid().slice(0, 8);
  const inputRef = React.useRef();

  function handleClick(e) {
    let roomId,
      host = false;
    if (!name) e.preventDefault();
    if (e.target.id === "jn") {
      roomId = room;
      if (!room) e.preventDefault();
    } else {
      roomId = uid;
      host = true;
    }

    socket.emit("join", { roomId, name, host }, () => {
      history.push("/");
    });
  }

  useEffect(() => {
    setRoom(window.location.href.split("#")[1]);
  });

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Ludo.io</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            placeholder="Room Id"
            className="joinInput mt-20"
            ref={inputRef}
            type="text"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            value={room || ""}
          />
        </div>
        <Link
          onClick={handleClick}
          id="jn"
          to={`/${room}`}
          className="button mt-20"
        >
          Join Room
        </Link>
        <Link
          onClick={handleClick}
          id="cr"
          to={`/${uid}`}
          className="button mt-20"
        >
          Create Room
        </Link>
      </div>
    </div>
  );
}

export default Join;
