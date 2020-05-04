import React from "react";
import "./Square.css";
import { v4 as uuidv4 } from "uuid";

function Square({
  id,
  isMoveDone,
  myColor,
  movePawn,
  red,
  blue,
  yellow,
  green,
}) {
  let bluePawns = Array.from({ length: blue }).map(() => (
    <div key={uuidv4()} className="pawn blue"></div>
  ));
  let redPawns = Array.from({ length: red }).map(() => (
    <div key={uuidv4()} className="pawn red"></div>
  ));
  let yellowPawns = Array.from({ length: yellow }).map(() => (
    <div key={uuidv4()} className="pawn yellow"></div>
  ));
  let greenPawns = Array.from({ length: green }).map(() => (
    <div key={uuidv4()} className="pawn green"></div>
  ));

  const pawnsInBox =
    bluePawns.length + redPawns.length + yellowPawns.length + greenPawns.length;
  let repeat = 1;
  if (pawnsInBox > 1) repeat = 2;
  else if (pawnsInBox > 4) repeat = 3;

  const redBoxes = [9, 10, 12, 15, 18, 21];
  const blueBoxes = [24, 36, 37, 38, 39, 40];
  const yellowBoxes = [60, 63, 66, 69, 72, 71];
  const greenBoxes = [41, 42, 43, 44, 45, 57];
  let bgColor;
  if (redBoxes.includes(id)) bgColor = "rgb(87, 33, 33)";
  else if (blueBoxes.includes(id)) bgColor = "rgb(27, 29, 53)";
  else if (yellowBoxes.includes(id)) bgColor = "rgb(88, 83, 35)";
  else if (greenBoxes.includes(id)) bgColor = "rgb(27, 71, 33)";
  else bgColor = "#1a1a1d";

  function handleClick() {
    if (myColor === 0 || isMoveDone) return;
    movePawn(id);
  }

  return (
    <div
      id="Square"
      className={[49, 11, 32, 70].includes(id) ? "crossed Square" : "Square"}
      style={{
        gridTemplateColumns: `repeat(${repeat}, 1fr)`,
        gridTemplateRows: `repeat(${repeat}, 1fr)`,
        backgroundColor: bgColor,
      }}
      onClick={handleClick}
    >
      {bluePawns}
      {redPawns}
      {yellowPawns}
      {greenPawns}
    </div>
  );
}

export default Square;
