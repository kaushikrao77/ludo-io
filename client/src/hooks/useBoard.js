import { useState } from "react";
export default () => {
  let initialVal = {
    blue: [29, 19, 22, 0],
    red: [5, 1, 1, 1],
    yellow: [6, 2, 2, 2],
    green: [7, 3, 3, 3],
  };

  const next = [
    24,
    10,
    71,
    57,
    4,
    6,
    7,
    10,
    5,
    12,
    13,
    8,
    15,
    16,
    11,
    18,
    19,
    14,
    21,
    22,
    17,
    4,
    29,
    24,
    25,
    26,
    27,
    28,
    20,
    30,
    31,
    32,
    33,
    34,
    46,
    23,
    37,
    38,
    39,
    40,
    4,
    4,
    41,
    42,
    43,
    44,
    58,
    35,
    47,
    48,
    49,
    50,
    51,
    61,
    53,
    54,
    55,
    56,
    57,
    52,
    4,
    64,
    59,
    60,
    67,
    62,
    63,
    70,
    65,
    66,
    73,
    68,
    69,
    76,
    71,
    74,
    75,
  ];

  const [value, setValue] = useState(initialVal);
  let returnObject = {
    board: value,
    next,
    setValue,
  };
  return returnObject;
};
