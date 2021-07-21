const { GraphQLObjectType, GraphQLString } = require('graphql');

const { loginUser, createUser } = require('../controllers/authController');

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
    resolve(_parent, args) { return loginUser(args); }
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


module.exports = { loginUserQuery, createUserMutation };