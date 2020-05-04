import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./Names.css";

//Renders player names
function Names({ socket }) {
  let [divs, changeDivs] = useState([]);
  useEffect(() => {
    socket.on("names", (names) => {
      changeDivs(names.map((name) => <div key={uuid()}>{name}</div>));
    });
  }, []);
  return <div className="Names">{divs}</div>;
}

export default Names;
