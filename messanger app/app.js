const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("./socket");
const io = socket.init(server);   
require("dotenv").config();
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
app.use("/chat", chatRoutes);

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Page Not Found"

    });

});

const PORT = 3000;


User.hasMany(Message);

Message.belongsTo(User);

io.on("connection", (socket) => {

    console.log("User Connected");

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