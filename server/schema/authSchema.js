const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = require('graphql');

const { loginUser, createUser, deleteUser } = require('../controllers/userControllers');

// Return types
const UserType = new GraphQLObjectType(
    {
        name: 'User',
        fields: () => ({
            id: { type: GraphQLID },
            email: { type: GraphQLString },
            token: { type: GraphQLString },
            status: { type: GraphQLString }
        })
    });

// Queries and Mutations
const loginUserQuery = {
    type: UserType,
    args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(_parent, args) { return loginUser(args); }
}

const createUserMutation = {
    type: UserType,
    args:
    {
        email: { type:  new GraphQLNonNull(GraphQLString) },
        password: { type:  new GraphQLNonNull(GraphQLString) }
    },
    resolve(_parent, args) { return createUser(args); }
};

const deleteUserMutation = {
    type: UserType,
    args: {
        token: { type: new GraphQLNonNull(GraphQLString)},
        password: { type:  new GraphQLNonNull(GraphQLString) }
     },
    resolve(_parent, args, context) { return deleteUser(args, context); }
};

module.exports = { loginUserQuery, createUserMutation, deleteUserMutation };