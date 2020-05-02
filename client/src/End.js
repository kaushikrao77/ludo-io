import React from "react";
import "./End.css";

function End(props) {
  let blue = Array.from({ length: props.blue }).map(() => (
    <div className="blue"></div>
  ));
  let red = Array.from({ length: props.red }).map(() => (
    <div className="red"></div>
  ));
  let yellow = Array.from({ length: props.yellow }).map(() => (
    <div className="yellow"></div>
  ));
  let green = Array.from({ length: props.green }).map(() => (
    <div className="green"></div>
  ));
  return (
    <div id="End" className={`End i${props.id}`}>
      <div className="up">{red}</div>
      <div className="right">{green}</div>
      <div className="down">{yellow}</div>
      <div className="left">{blue}</div>
    </div>
  );
}

export default End;
