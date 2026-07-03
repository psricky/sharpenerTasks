const path = require("path");

// ======================
// Display Login Page
// ======================

exports.getLoginPage = (req, res) => {

    res.sendFile(path.join(__dirname, "../public/login.html"));

};


// ======================
// Display Signup Page
// ======================

exports.getSignupPage = (req, res) => {

    res.sendFile(path.join(__dirname, "../public/signup.html"));

};


// ======================
// Signup Controller
// ======================

exports.signup = async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        console.log("Signup Details");

        console.log(name);
        console.log(email);
        console.log(phone);
        console.log(password);

        res.status(201).json({

            success: true,
            message: "Signup Successful"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};


// ======================
// Login Controller
// ======================

exports.login = async (req, res) => {

    try {

        const { emailOrPhone, password } = req.body;

        console.log("Login Details");

        console.log(emailOrPhone);
        console.log(password);

        res.status(200).json({

            success: true,
            message: "Login Successful"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal Server Error"

        });

    }

};