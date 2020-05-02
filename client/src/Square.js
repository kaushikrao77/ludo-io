import React from "react";
import "./Square.css";
import { v4 as uuidv4 } from "uuid";

function Square(props) {
  let blue = Array.from({ length: props.blue }).map(() => (
    <div key={uuidv4()} className="pawn blue"></div>
  ));
  let red = Array.from({ length: props.red }).map(() => (
    <div key={uuidv4()} className="pawn red"></div>
  ));
  let yellow = Array.from({ length: props.yellow }).map(() => (
    <div key={uuidv4()} className="pawn yellow"></div>
  ));
  let green = Array.from({ length: props.green }).map(() => (
    <div key={uuidv4()} className="pawn green"></div>
  ));

  const pawnsInBox = blue.length + red.length + yellow.length + green.length;
  let repeat = 1;
  if (pawnsInBox > 1) repeat = 2;
  else if (pawnsInBox > 4) repeat = 3;

  const redBoxes = [9, 10, 12, 15, 18, 21];
  const blueBoxes = [24, 36, 37, 38, 39, 40];
  const yellowBoxes = [60, 63, 66, 69, 72, 71];
  const greenBoxes = [41, 42, 43, 44, 45, 57];
  let bgColor;
  if (redBoxes.includes(props.id)) bgColor = "rgb(253, 190, 190)";
  else if (blueBoxes.includes(props.id)) bgColor = "rgb(188, 192, 255)";
  else if (yellowBoxes.includes(props.id)) bgColor = "rgb(255, 247, 173)";
  else if (greenBoxes.includes(props.id)) bgColor = "rgb(196, 255, 204)";
  else bgColor = "white";

  const handleClick = () => {
    if (props[props.myColor] === 0 || props.isMoveDone) return;
    props.movePawn(props.id);
  };
  return (
    <div
      className={
        [49, 11, 32, 70].includes(props.id) ? "crossed Square" : "Square"
      }
      style={{
        gridTemplateColumns: `repeat(${repeat}, 1fr)`,
        gridTemplateRows: `repeat(${repeat}, 1fr)`,
        backgroundColor: bgColor,
      }}
      onClick={handleClick}
    >
      {blue}
      {red}
      {yellow}
      {green}
    </div>
  );
}

export default Square;
