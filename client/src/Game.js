import React, { useEffect } from "react";
import Square from "./Square";
import Home from "./Home";
import End from "./End";
import Dice from "./Dice";
import useBoard from "./hooks/useBoard";
import "./Game.css";

function Game(props) {
  const socket = props.socket;
  const safe = [10, 11, 24, 32, 49, 57, 70, 71];
  const { board, next, setValue } = useBoard(null);
  const freq = (arr, num) => {
    let cnt = 0;
    arr.forEach((ele) => {
      ele === num && cnt++;
    });
    return cnt;
  };

  if (props.myColor === "blue") next[35] = 36;
  else if (props.myColor === "red") next[6] = 9;
  else if (props.myColor === "yellow") next[75] = 72;
  else if (props.myColor === "green") next[46] = 45;

  function tellSocketMoveDone() {
    socket.emit("turn", {});
  }

  function possibleMoveChecker(number) {
    let pawns = board[props.myColor];
    let possible = 0;
    for (let pawn of pawns) {
      if (!nextF(pawn, number)) possible++;
    }
    if (possible === 4) {
      console.log("not possible");
      props.toggleMoveDone(true);
      tellSocketMoveDone();
    }
  }

  function nextF(n, count) {
    if (count === 0) return n;
    if (n === 4) return false;
    if ([0, 1, 2, 3].includes(n)) {
      if (count === 6) {
        return [24, 10, 71, 57][n];
      }
      return false;
    }
    let tempn = next[n];
    return nextF(tempn, --count);
  }
  const hit = (color, newId) => {
    let match = {
      blue: 0,
      red: 1,
      yellow: 2,
      green: 3,
    };
    let tempBoard = { ...board };
    tempBoard[color][board[color].indexOf(newId)] = match[color];
    return tempBoard;
  };
  const movePawn = (id) => {
    let isHit = false;
    let newId = nextF(id, props.number);
    let tempBoard = { ...board };
    if (props.isActive) {
      return;
    }
    if (!newId) {
      newId = id;
      return;
    }
    if (!safe.includes(newId)) {
      for (let color of Object.keys(board)) {
        if (color !== props.myColor && board[color].includes(newId)) {
          tempBoard = hit(color, newId);
          isHit = true;
        }
      }
    }
    tempBoard[props.myColor][tempBoard[props.myColor].indexOf(id)] = newId;
    setValue(tempBoard);
    props.toggleMoveDone(true);
    if (props.number === 6 || isHit || newId === 4) {
      props.toggleActive(true);
      props.toggleMoveDone(false);
    } else {
      tellSocketMoveDone();
    }
    socket.emit("board", board);
  };

  const squares = Array.from({ length: 77 }).map((sq, idx) => {
    if (idx < 4)
      return (
        <Home
          key={idx}
          id={idx}
          blue={freq(board.blue, idx)}
          red={freq(board.red, idx)}
          yellow={freq(board.yellow, idx)}
          green={freq(board.green, idx)}
          movePawn={movePawn}
          isActive={props.isActive}
          isMoveDone={props.isMoveDone}
          myColor={props.myColor}
        ></Home>
      );
    else if (idx === 4)
      return (
        <End
          key={idx}
          id={idx}
          blue={freq(board.blue, idx)}
          red={freq(board.red, idx)}
          yellow={freq(board.yellow, idx)}
          green={freq(board.green, idx)}
        ></End>
      );
    return (
      <Square
        key={idx}
        id={idx}
        blue={freq(board.blue, idx)}
        red={freq(board.red, idx)}
        yellow={freq(board.yellow, idx)}
        green={freq(board.green, idx)}
        movePawn={movePawn}
        isMoveDone={props.isMoveDone}
        isActive={props.isActive}
        myColor={props.myColor}
      ></Square>
    );
  });

  useEffect(() => {
    socket.on("board", (newBoard) => {
      setValue(newBoard);
    });
    socket.on("turn", () => {
      props.toggleActive(true);
      props.toggleMoveDone(false);
    });
  }, []);

  return (
    <div>
      <div className="Board">{squares}</div>
      <Dice
        number={props.number}
        changeNumber={props.changeNumber}
        isActive={props.isActive}
        toggleActive={props.toggleActive}
        toggleMoveDone={props.toggleMoveDone}
        isMoveDone={props.isMoveDone}
        possibleMoveChecker={possibleMoveChecker}
      />
    </div>
  );
}

export default Game;
