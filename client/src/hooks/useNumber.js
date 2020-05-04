import { useState } from "react";
export default (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const random = () => {
    let rNum = Math.ceil(Math.random() * 6);
    setValue(rNum);
    return rNum;
  };
  return [value, random];
};
