let rooms = {};
let users = {};
let nameToSocketId = {};

const addUser = ({ name, roomId, socketId }) => {
  name = name.trim().toLowerCase();
  if (rooms[roomId] && rooms[roomId].includes(name)) {
    return { error: "Username is taken" };
  }
  if (rooms[roomId] && rooms[roomId].length === 4)
    return { error: "Room is full" };
  if (!!rooms[roomId]) {
    rooms[roomId].push(name);
  } else {
    rooms[roomId] = [name];
  }
  users[socketId] = { name, roomId };
  nameToSocketId[name] = socketId;
};
const removeUser = (socketId) => {
  let name, roomId;
  if (users[socketId]) {
    name = users[socketId].name;
    roomId = users[socketId].roomId;
  }
  if (rooms && rooms[roomId]) {
    rooms[roomId] = rooms[roomId].filter((x) => {
      if (x !== name) return true;
    });
    delete users[socketId];
    delete nameToSocketId[name];
  }
};

module.exports = { rooms, users, nameToSocketId, addUser, removeUser };
