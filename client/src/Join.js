import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

function Join({ socket, history }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  let uid = Math.ceil(Math.random() * 1000);
  const handleClick = (e) => {
    console.log(socket);
    let roomId,
      host = false;
    if (!name) e.preventDefault();
    if (e.target.id == "jn") {
      roomId = room;
      if (!room) e.preventDefault();
    } else {
      roomId = uid;
      host = true;
    }
    socket.emit("join", { roomId, name, host }, () => {
      history.push("/");
    });
  };
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
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
            type="text"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
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
