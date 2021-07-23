const bcrypt = require("bcryptjs");

const User = require("../models/userModel.js");

const getProfile = (context) =>
    {
        try
        {
            const { user } = context;
            if(!user) return { status: "Request unauthorized!" };

            const profile = {
                name: user.name,
                status: 'Looks like you are in!'
            };

            return profile;
        }
        catch(err) { return { status: err.message }; };
    };

const deleteUser = async (context) =>
  {
    try
    {
        const { user } = context;
        if(!user) return { status: "Request unauthorized!" };

        const id = user.id;
        await User.findByIdAndDelete(id);

        return { status: 'User deleted successfully!' };
    }
    catch (err) { return { status: err.message }; };
  };

const updatePassword = async (args, context) =>
  {
    try
    {
        const { user } = context;
        if(!user) return { status: "Request unauthorized!" };

        const { password } = args;
        const id = user.id;

        const salt = await bcrypt.genSalt(10);
        if (!salt) return { status: 'Something went wrong with bcrypt' };

        const hash = await bcrypt.hash(password, salt);
        if (!hash) return { status: 'Something went wrong hashing the password' };

        await User.findByIdAndUpdate(id, { password: hash }, { upsert: true });

        return { status: "Password has been updated!" };
    }
    catch (err) { return { status: err.message }; };
  };

module.exports = { getProfile, deleteUser, updatePassword };