const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

const { loginUser, createUser, deleteUser } = require('../controllers/authController');

// Return types
const UserType = new GraphQLObjectType(
    {
        name: 'UserType',
        fields: () => ({
            name: { type: GraphQLString },
            token: { type: GraphQLString },
            status: { type: GraphQLString }
        })
    });

// Queries and Mutations
const loginUserQuery = {
    type: UserType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        tokenId: { type: GraphQLString }
    },
    resolve(_parent, args, context) { return loginUser(args, context); }
};

const createUserMutation = {
    type: UserType,
    args:
    {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        tokenId: { type: GraphQLString }
    },
    resolve(_parent, args) { return createUser(args); }
};

const deleteUserMutation = {
    type: UserType,
    resolve(_parent, _args, context) { return deleteUser(context); }
};

const updatePasswordMutation = {
    type: UserType,
    args: { newPassword: { type: new GraphQLNonNull(GraphQLString) } },
    resolve(_parent, args, context) { return updatePassword(args, context); }
};

module.exports = { loginUserQuery, createUserMutation, deleteUserMutation, updatePasswordMutation };