import { useState } from "react";
export default (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const random = () => {
    setValue(Math.ceil(Math.random() * 6));
  };
  return [value, random];
};
