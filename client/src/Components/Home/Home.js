import React from "react";
import "./Home.css";
import { v4 as uuidv4 } from "uuid";

function Home(props) {
  let blue = Array.from({ length: props.blue }).map(() => (
    <div key={uuidv4()} className="blue"></div>
  ));
  let red = Array.from({ length: props.red }).map(() => (
    <div key={uuidv4()} className="red"></div>
  ));
  let yellow = Array.from({ length: props.yellow }).map(() => (
    <div key={uuidv4()} className="yellow"></div>
  ));
  let green = Array.from({ length: props.green }).map(() => (
    <div key={uuidv4()} className="green"></div>
  ));

  function handleClick() {
    if (props[props.myColor] === 0 || props.isMoveDone) return;
    props.movePawn(props.id);
  }

  return (
    <div className={`Home i${props.id}`} onClick={handleClick}>
      <div>
        {blue}
        {red}
        {yellow}
        {green}
      </div>
    </div>
  );
}

export default Home;
