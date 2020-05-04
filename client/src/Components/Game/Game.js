import React, { useEffect } from "react";
import Square from "../Square/Square";
import Home from "../Home/Home";
import End from "../End/End";
import Dice from "../Dice/Dice";
import Names from "../Names/Names";
import useBoard from "../../hooks/useBoard";
import "./Game.css";

function Game({
  socket,
  myColor,
  toggleActive,
  toggleMoveDone,
  number,
  isMoveDone,
  isActive,
  changeNumber,
}) {
  const { board, next, setValue } = useBoard(null);
  const safe = [10, 11, 24, 32, 49, 57, 70, 71];

  if (myColor === "blue") next[35] = 36;
  else if (myColor === "red") next[6] = 9;
  else if (myColor === "yellow") next[75] = 72;
  else if (myColor === "green") next[46] = 45;

  function freq(arr, num) {
    let cnt = 0;
    arr.forEach((ele) => {
      ele === num && cnt++;
    });
    return cnt;
  }

  //informs server that the move is done
  function tellSocketMoveDone() {
    toggleActive(false);
    toggleMoveDone(true);
    socket.emit("turn", {});
  }

  //checks if there is a possible move
  function possibleMoveChecker(number) {
    let pawns = board[myColor];
    let possible = 0;
    for (let pawn of pawns) {
      if (!nextSquareId(pawn, number)) possible++;
    }
    if (possible === 4) {
      toggleMoveDone(true);
      tellSocketMoveDone();
    }
  }

  //finds id of the next square
  function nextSquareId(n, count) {
    if (count === 0) return n;
    if (n === 4) return false;
    if ([0, 1, 2, 3].includes(n)) {
      if (count === 6) {
        return [24, 10, 71, 57][n];
      }
      return false;
    }
    let tempn = next[n];
    return nextSquareId(tempn, --count);
  }

  //takes care of hitting a pawn logic
  function hit(color, newId) {
    let match = {
      blue: 0,
      red: 1,
      yellow: 2,
      green: 3,
    };
    let tempBoard = { ...board };
    tempBoard[color][board[color].indexOf(newId)] = match[color];
    return tempBoard;
  }

  //moves the pawn
  function movePawn(id) {
    let isHit = false;
    let newId = nextSquareId(id, number);
    let tempBoard = { ...board };
    if (isActive) {
      return;
    }
    if (!newId) {
      newId = id;
      return;
    }
    if (!safe.includes(newId)) {
      for (let color of Object.keys(board)) {
        if (color !== myColor && board[color].includes(newId)) {
          tempBoard = hit(color, newId);
          isHit = true;
        }
      }
    }
    tempBoard[myColor][tempBoard[myColor].indexOf(id)] = newId;
    setValue(tempBoard);
    toggleMoveDone(true);
    if (number === 6 || isHit || newId === 4) {
      toggleActive(true);
      toggleMoveDone(false);
    } else {
      tellSocketMoveDone();
    }
    if (JSON.stringify(board[myColor]) === JSON.stringify([4, 4, 4, 4])) {
      tellSocketMoveDone();
      socket.emit("finish", {});
    }
    socket.emit("board", board);
  }

  //board formation
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
          isActive={isActive}
          isMoveDone={isMoveDone}
          myColor={myColor}
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
        isMoveDone={isMoveDone}
        isActive={isActive}
        myColor={myColor}
      ></Square>
    );
  });

  useEffect(() => {
    //updates the board
    socket.on("board", (newBoard) => {
      setValue(newBoard);
    });

    //allows the player to play his turn
    socket.on("turn", () => {
      toggleActive(true);
      toggleMoveDone(false);
    });
  }, []);

  return (
    <div className="Game">
      <div className="Board">{squares}</div>
      <div>
        <Dice
          number={number}
          changeNumber={changeNumber}
          isActive={isActive}
          toggleActive={toggleActive}
          toggleMoveDone={toggleMoveDone}
          isMoveDone={isMoveDone}
          possibleMoveChecker={possibleMoveChecker}
        />
        <Names socket={socket} />
      </div>
    </div>
  );
}

export default Game;
