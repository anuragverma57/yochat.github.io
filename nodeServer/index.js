// NODE SERVER which will handle socket io connection

const socket = require("socket.io");

const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:5500",
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (Name) => {
    console.log("New User", Name);
    users[socket.id] = Name;
    socket.broadcast.emit("user-joined", Name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      Name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
