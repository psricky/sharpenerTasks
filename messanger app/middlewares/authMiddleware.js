const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try {

        // Read token from request header
        const token = req.header("Authorization");

        // Check whether token exists
        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Access Denied"

            });

        }

        // Verify token
        const decodedToken = jwt.verify(
            token,
            "mySecretKey"
        );

        // Store user information in request
        req.user = decodedToken;

        // Move to next middleware/controller
        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,

            message: "Invalid Token"

        });

    }

};