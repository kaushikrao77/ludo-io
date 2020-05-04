import React, { useState, useEffect } from "react";
import Game from "../Game/Game";
import Chat from "../Chat/Chat";
import useNumber from "../../hooks/useNumber";
import "./GamePage.css";

function GamePage({ socket }) {
  const [number, changeNumber] = useNumber(null);
  const [isActive, toggleActive] = useState(false);
  const [isMoveDone, toggleMoveDone] = useState(true);
  const [myColor, setMyColor] = useState("blue");

  useEffect(() => {
    //sets the players color
    socket.on("color", ({ myColor }) => {
      setMyColor(myColor);
    });
  }, [myColor]);

  return (
    <div className="GamePage">
      <h1>Ludo.io</h1>
      <div className="partition">
        <Game
          socket={socket}
          myColor={myColor}
          number={number}
          changeNumber={changeNumber}
          isActive={isActive}
          toggleActive={toggleActive}
          isMoveDone={isMoveDone}
          toggleMoveDone={toggleMoveDone}
        />
        <Chat socket={socket} />
      </div>
    </div>
  );
}

export default GamePage;
