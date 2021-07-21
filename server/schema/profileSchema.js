const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

const { getProfile, deleteUser, updatePassword } = require('../controllers/profileController');

// Return types
const ProfileType = new GraphQLObjectType(
    {
        name: 'ProfileType',
        fields: () => ({
            name: { type: GraphQLString },
            status: { type: GraphQLString }
        })
    });

// Queries and Mutations
const getProfileQuery = {
    type: ProfileType,
    resolve(_parent, _args, context) { return getProfile(context); }
};

const deleteUserMutation = {
    type: ProfileType,
    resolve(_parent, _args, context) { return deleteUser(context); }
};

const updatePasswordMutation = {
    type: ProfileType,
    args: { password: { type: new GraphQLNonNull(GraphQLString) } },
    resolve(_parent, args, context) { return updatePassword(args, context); }
};

module.exports = { getProfileQuery, deleteUserMutation, updatePasswordMutation };