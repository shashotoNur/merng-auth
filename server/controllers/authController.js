const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel.js");
const jwtSecret = process.env.JWT_SECRET;

const loginUser = async (args) =>
{
  const { email, password } = args;

  try
  {
    var user = await User.findOne({ email });
    if (!user) return { status: 'User does not exists' };

    const validCreds = await bcrypt.compare(password, user.password);
    if (!validCreds) return { status: 'Invalid credentials' };

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: 3600 });
    if (!token) return { status: "Couldn't sign the token" };

    user.token = token; user.status = 'Sign in successful!';
    return user;
  }
  catch (err) { return { status: err }; };
};


const createUser = async (args) =>
{
  const { email, password } = args;
  
  try
  {
    const user = await User.findOne({ email });
    if (user) return { status: 'User already exists' };

    const salt = await bcrypt.genSalt(10);
    if (!salt) return { status: 'Something went wrong with bcrypt' };

    const hash = await bcrypt.hash(password, salt);
    if (!hash) return { status: 'Something went wrong hashing the password' };

    var newUser = new User( { email, password: hash } );

    var savedUser = await newUser.save();
    if (!savedUser) return { status: 'Something went wrong saving the user' };

    const token = jwt.sign({ id: savedUser._id }, jwtSecret, { expiresIn: 3600 });

    savedUser.token = token; savedUser.status = 'User successfully created!';
    return savedUser;
  }
  catch (err) { return { status: err }; };
};

const deleteUser = async (args, context) =>
{
  const { password } = args;
  const { res } = context;

  try
  {
    const { id } = res.locals.user;
    const user = await User.findOne({ _id: id });
    if (!user) return { status: 'User does not exist' };

    const validCreds = await bcrypt.compare(password, user.password);
    if (!validCreds) return { status: 'Invalid credentials' };

    var deletedUser = await User.findByIdAndDelete(id);

    deletedUser.status = "User has been deleted!";
    return deletedUser;
  }
  catch (err) { return { status: err }; };
}

module.exports = { loginUser, createUser, deleteUser };