const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const User = require('../models/userModel');

const requireAuth = async (req, res, next) =>
{
  if(req.header('header-dest-value')) destination = req.header('header-dest-value') ;
  else return { status: 'Request destination is not specified' };

  if(destination !== 'signup' || destination !== 'login')
  {
    const token = req.header('x-auth-token');

    if (!token) return { status: 'No token, authorization denied' };

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
  }

  else next();
};

module.exports = { requireAuth };