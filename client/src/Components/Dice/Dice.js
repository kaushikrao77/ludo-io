import React from "react";
import "./Dice.css";

function Dice({
  toggleMoveDone,
  toggleActive,
  isActive,
  changeNumber,
  possibleMoveChecker,
  number,
}) {
  //all faces of a die
  let faces = [
    <div className="dice first-face">
      <span className="dot"></span>
    </div>,
    <div className="dice second-face">
      <span className="dot"></span>
      <span className="dot"></span>
    </div>,
    <div className="dice third-face">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>,
    <div className="fourth-face dice">
      <div className="column">
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <div className="column">
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>,
    <div className="fifth-face dice">
      <div className="column">
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <div className="column">
        <span className="dot"></span>
      </div>
      <div className="column">
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>,
    <div className="sixth-face dice">
      <div className="column">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <div className="column">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>,
  ];
  function handleClick() {
    let a = changeNumber();
    toggleActive(false);
    toggleMoveDone(false);
    possibleMoveChecker(a);
  }
  return (
    <div className="Dicee">
      {faces[number - 1]}
      {isActive && (
        <button className="roll" onClick={handleClick}>
          Roll
        </button>
      )}
    </div>
  );
}

export default Dice;
