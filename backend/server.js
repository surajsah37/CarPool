const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const notificationRoutes = require("./routes/notificationRoutes");
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/rides", require("./routes/rideRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/notifications", notificationRoutes);
const PORT = process.env.PORT || 5000;



const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// 🔥 MAKE GLOBAL
app.set("io", io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// ❗ CHANGE THIS
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });