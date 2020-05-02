import React, { useState, useEffect } from "react";
import Game from "./Game";
import useNumber from "./hooks/useNumber";
import useToggle from "./hooks/useToggle";

function GamePage({ socket }) {
  const [number, changeNumber] = useNumber(null);
  const [isActive, toggleActive] = useState(false);
  const [isMoveDone, toggleMoveDone] = useState(true);
  const [myColor, setMyColor] = useState("blue");
  useEffect(() => {
    socket.on("color", ({ myColor }) => {
      console.log(myColor);
      setMyColor(myColor);
    });
  }, [myColor]);
  return (
    <div>
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
    </div>
  );
}

export default GamePage;
