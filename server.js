const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const {
  rooms,
  users,
  nameToSocketId,
  addUser,
  removeUser,
} = require("./users.js");

const port = 5000;

const router = require("./router");

const app = express();
app.use(cors());
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

const io = socketio(server, { transports: ["websocket", "polling"] });
io.set("origins", "http://localhost:3000");
app.use(router);

let colors = {};
let nextObject = {};

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("join", ({ name, roomId, host }, cb) => {
    const errObj = addUser({ name, roomId, socketId: socket.id });
    if (host) {
      io.to(socket.id).emit("host", {});
    }
    console.log(rooms);
    if (errObj && errObj.error) return cb(errObj.error);
    socket.join(roomId);
    io.in(roomId).emit("members", rooms[roomId]);
  });

  socket.on("start", () => {
    let room = users[socket.id].roomId;
    colors[room] = ["blue", "red", "green", "yellow"];
    let tempNextObject = {};
    tempNextObject[nameToSocketId[rooms[room][rooms[room].length - 1]]] =
      nameToSocketId[rooms[room][0]];
    for (let i = 0; i < rooms[room].length; i++) {
      let tempSocketId = nameToSocketId[rooms[room][i]];
      if (i + 1 < rooms[room].length) {
        tempNextObject[tempSocketId] = nameToSocketId[rooms[room][i + 1]];
      }
      io.to(tempSocketId).emit("start", {});
      io.to(tempSocketId).emit("color", {
        myColor: colors[room].shift(),
      });
      if (i === 0) {
        io.to(tempSocketId).emit("turn", {});
      }
    }
    nextObject[room] = tempNextObject;
  });

  socket.on("board", (board) => {
    let room = users[socket.id].roomId;
    socket.to(room).emit("board", board);
  });

  socket.on("turn", () => {
    console.log(nextObject);
    io.to(nextObject[users[socket.id].roomId][socket.id]).emit("turn", {});
  });

  socket.on("disconnect", () => {
    if (users[socket.id]) {
      roomId = users[socket.id].roomId;
      removeUser(socket.id);
      io.to(roomId).emit("members", rooms[roomId]);
    }
    console.log(rooms);
    console.log("user has left!!");
  });
});
