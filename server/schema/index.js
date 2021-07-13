const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const { loginUserQuery, createUserMutation, deleteUserMutation, updatePasswordMutation } = require('./authSchema')
const { getProfileQuery } = require('./profileSchema');

// Reading data
const RootQuery = new GraphQLObjectType(
    {
        name: 'RootQueryType',
        fields:
        {
            loginUserQuery,
            getProfileQuery
        }
    });

// Anything other than reading
const Mutation = new GraphQLObjectType(
    {
        name: 'Mutation',
        fields:
        {
            createUserMutation,
            deleteUserMutation,
            updatePasswordMutation
        }
    });


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});