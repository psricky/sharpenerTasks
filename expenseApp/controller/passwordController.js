const bcrypt = require('bcrypt'); // 1. Import bcrypt at the top of your file
const { NewUsers, ForgotPasswordRequests } = require('../models');

const { sendForgotPasswordEmail } = require('../services/nodemailerService');
const { v4: uuidv4 } = require('uuid');
// const sendForgotPasswordController = async (req, res) => {
//   try {
//     const email = req.body.email;
//     if (!email) {
//       return res.status(400).json({ success: false, message: 'Email is required' });
//     }

//     const user = await NewUsers.findOne({ where: { email } });
//     if (!user) {
//       return res.status(200).json({
//         success: true,
//         message: 'If the email is registered, password reset instructions have been sent.'
//       });
//     }

//     const resetRequest = await ForgotPasswordRequests.create({ userId: user.id });
//     await sendForgotPasswordEmail(email, resetRequest.id);

//     return res.status(200).json({ success: true, message: 'Password reset email sent successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

function generateResetToken() {
    // Generate a fresh unique ID
    const token = uuidv4();

    console.log("Generated UUID Token:", token);
    // Example Output: 96c81373-6d2b-452f-a65d-6ce77e457e39

    return token;
}

const sendForgotPasswordController = async (req, res) => {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        const uniqueToken = generateResetToken();
        const user = await NewUsers.findOne({ where: { email } });
        if (!user) {
            return res.status(200).json({
                success: true,
                message: 'User not registered with this email, Please signup to continue'
            });
        }

        await sendForgotPasswordEmail("psrickyking@gmail.com", uniqueToken);
        const resetRequest = await ForgotPasswordRequests.create({
            userId: user.id, id: uniqueToken,
            isActive: true
        });

        return res.status(200).json({ success: true, message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const { newPassword } = req.body;
        const resetRequest = await ForgotPasswordRequests.findOne({ where: { id: token, isActive: true } });
        if (!resetRequest) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }
        const user = await NewUsers.findByPk(resetRequest.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.password = newPassword;
        await user.save();
        resetRequest.isActive = false;
        await resetRequest.save();
        return res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const forgetPasswordLinkByUuid = async (req, res) => {
    try {
        const token = req.params.token;
        const resetRequest = await ForgotPasswordRequests.findOne({ where: { id: token, isActive: true } });

        if (!resetRequest) {
            return res.status(400).send('<h1>Error: Invalid or expired token</h1>');
        }

        const user = await NewUsers.findByPk(resetRequest.userId);
        if (!user) {
            return res.status(404).send('<h1>Error: User not found</h1>');
        }

        // Serving the HTML form directly to the browser
        return res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Password</title>
            <style>
                body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f4f9; }
                .form-container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); width: 300px; }
                input { width: 100%; padding: 10px; margin: 10px 0; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
                button { width: 100%; padding: 10px; background-color: #007BFF; color: white; border: none; border-radius: 4px; cursor: pointer; }
                button:hover { background-color: #0056b3; }
            </style>
        </head>
        <body>
            <div class="form-container">
                <h2>Reset Your Password</h2>
                <form id="resetForm">
                    <input type="password" id="password" placeholder="Enter new password" required />
                    <button type="submit">Update Password</button>
                </form>
            </div>

            <script>
                document.getElementById('resetForm').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const password = document.getElementById('password').value;
                    
                    try {
                        // Calling your second backend API to update the database
                        const response = await fetch('/password/updatepassword/${token}', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ password })
                        });

                        const data = await response.json();
                        if (response.ok) {
                            alert('Password reset successfully!');
                            window.close(); // Closes tab or redirects to your login page
                        } else {
                            alert(data.message || 'Something went wrong');
                        }
                    } catch (err) {
                        console.error(err);
                        alert('Error updating password.');
                    }
                });
            </script>
        </body>
        </html>
    `);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('<h1>Internal server error</h1>');
    }
}

const submitNewPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const { password } = req.body;

        const resetRequest = await ForgotPasswordRequests.findOne({ where: { id: token, isActive: true } });
        if (!resetRequest) {
            return res.status(400).send('<h1>Error: Invalid or expired token</h1>');
        }

        const user = await NewUsers.findByPk(resetRequest.userId);
        if (!user) {
            return res.status(404).send('<h1>Error: User not found</h1>');
        }

        // 2. Generate a salt and hash the plain-text password
        const saltRounds = 10; // Standard security/performance balance
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 3. Update the user's password with the hashed version
        await user.update({ password: hashedPassword });

        // Deactivate the reset request
        await resetRequest.update({ isActive: false });

        return res.status(200).send({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>Internal server error</h1>');
    }
};


module.exports = { forgetPassword: sendForgotPasswordController, sendForgotPasswordController, forgetPasswordLinkByUuid, submitNewPassword };