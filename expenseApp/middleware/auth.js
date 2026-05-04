const jwt = require('jsonwebtoken');


const NewUsers = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, 'secretkey');

    const user = await NewUsers.findByPk(decoded.userId);

    req.user = user;  // attach user to request

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
module.exports = {
  authenticate
};