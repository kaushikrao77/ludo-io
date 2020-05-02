import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

function Room({ socket, history }) {
  const [members, setMembers] = useState([]);
  const [host, setHost] = useState(false);
  let membersDivs;
  useEffect(() => {
    socket.on("members", (newMembers) => {
      setMembers(newMembers);
    });
    socket.on("host", () => {
      setHost(true);
    });
    socket.on("start", () => {
      history.push(`/${window.location.href.split("/")[3]}/game`);
    });
  });
  let handleClick = () => {
    socket.emit("start");
  };
  membersDivs = members.map((member) => <li key={uuid()}>{member}</li>);
  return (
    <div>
      <ul>{membersDivs}</ul>
      {host && <button onClick={handleClick}>Start Game</button>}
    </div>
  );
}

export default Room;
