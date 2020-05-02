import React from "react";
import "./Dice.css";

function Dice(props) {
  return (
    <div className="Dice">
      <div className="number">{props.number}</div>
      <button
        className="roll"
        onClick={() => {
          props.changeNumber();
          props.toggleActive(false);
          props.toggleMoveDone(false);
          props.possibleMoveChecker(props.number);
        }}
        disabled={!props.isActive}
      >
        Roll
      </button>
    </div>
  );
}

export default Dice;
