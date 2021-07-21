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

        var deletedUser = await User.findByIdAndDelete(id);
        console.log(deletedUser)

        if(deletedUser.id !== null) return { status: 'Deletion failed! Try again.' };

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

        const id = user.id;

        const deletedUser = await User.findByIdAndUpdate(id, { password });
        console.log(deletedUser)

        return { status: "Password has been updated!" };
    }
    catch (err) { return { status: err.message }; };
  };

module.exports = { getProfile, deleteUser, updatePassword };