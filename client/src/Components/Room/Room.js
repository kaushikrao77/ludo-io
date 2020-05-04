import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./Room.css";

function Room({ socket, history }) {
  const [members, setMembers] = useState([]);
  const [host, setHost] = useState(false);

  useEffect(() => {
    socket.on("members", (newMembers) => {
      setMembers(
        newMembers.map((member) => (
          <li id="li" key={uuid()}>
            {member}
          </li>
        ))
      );
    });
    socket.on("host", () => {
      setHost(true);
    });
    socket.on("start", () => {
      history.push(`/${window.location.href.split("/")[3]}/game`);
    });
  }, []);

  function handleClick() {
    socket.emit("start");
  }

  return (
    <div className="roomOuterContainer">
      <div className="roomInnerContainer">
        <h1 className="heading">Lobby</h1>
        <div>
          <ul id="ul">{members}</ul>
          {host && (
            <button className="button" onClick={handleClick}>
              Start Game
            </button>
          )}
        </div>
      </div>
      <div className="href">{`localhost:3000#${
        window.location.href.split("/")[3]
      }`}</div>
    </div>
  );
}

export default Room;
