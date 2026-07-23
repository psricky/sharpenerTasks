const jwt = require('jsonwebtoken');


const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded:",decoded);

    const user = await User.findByPk(decoded.userId);
    console.log("user:",user);
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    req.user = user; 

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
module.exports = {
  authenticate
};