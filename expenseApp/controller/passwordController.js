const {sibFunction} = require('../services/sib');

const forgetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        if(!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        await sibFunction();
        return res.status(200).json({ success: true, message: "Password reset email sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { forgetPassword };