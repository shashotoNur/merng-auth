
const getProfile = (context) =>
{
    try
    {
        const { res } = context;
        const { user } = res.locals;

        const profile = {
            name: user.name,
            status: 'Looks like you are in!'
        };

        return profile;
    }
    catch(err) { return { status: err.message }; };
};

module.exports = { getProfile };