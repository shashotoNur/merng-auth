const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const User = require('../models/userModel');

const getReqUser = async (req, res, next) =>
  {
    const token = req.header.token;

    if (token == null) next();
    else
    {
      try
      {
        const decodedToken = jwt.verify(token, jwtSecret);
        const id = decodedToken.id;

        const user = await User.findOne({ _id: id });
        if (!user) return { status: 'User does not exists' };
        res.locals.user = user;

        next();
      }
      catch (err) { return { status: 'Token is not valid' }; };
    };
  };

module.exports = { getReqUser };