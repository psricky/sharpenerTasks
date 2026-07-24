const express = require("express");
const path = require("path");
const http = require("http");
const {Server} = require("socket.io");
require("dotenv").config();
const app = express(); 
const server=http.createServer(app);
const io = new Server(server);
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./config/db");
const User = require("./models/User");
const Message = require("./models/Message");
const chatRoutes = require("./routes/chatRoutes");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/", authRoutes);
app.use("/user", authRoutes);
app.use("/chat", chatRoutes(io));

const PORT = 3000;


User.hasMany(Message);

Message.belongsTo(User);

io.use(async (socket, next) => {

    try {

        const token = socket.handshake.auth.token;

        if (!token) {

            return next(new Error("Authentication failed"));

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findByPk(decoded.userId);

        if (!user) {

            return next(new Error("User not found"));

        }

        // Attach the authenticated user to the socket
        socket.user = user;

        next();

    } catch (err) {

        next(new Error("Authentication failed"));

    }

});

io.on("connection", (socket) => {

    console.log(`${socket.user.name} connected`);

    socket.on("disconnect", () => {

        console.log(`${socket.user.name} disconnected`);

    });

});

sequelize
    .sync()
    .then(() => {

        server.listen(PORT, () => {

            console.log(`Server running on http://localhost:${PORT}`);

        });

    })
    .catch((error) => {

        console.log(error);

    });