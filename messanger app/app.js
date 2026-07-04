const express = require("express");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const sequelize = require("./config/db");

const app = express();


// ==============================
// Middleware
// ==============================

// Parse JSON data sent by Fetch API
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));


// ==============================
// Static Files
// ==============================

app.use(express.static(path.join(__dirname, "public")));


// ==============================
// Routes
// ==============================

app.use("/", authRoutes);


// ==============================
// Handle Invalid Routes (404)
// ==============================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Page Not Found"

    });

});


// ==============================
// Start Server
// ==============================

const PORT = 3000;

sequelize
    .sync()
    .then(() => {

        app.listen(PORT, () => {

            console.log(`Server running on http://localhost:${PORT}`);

        });

    })
    .catch((error) => {

        console.log(error);

    });