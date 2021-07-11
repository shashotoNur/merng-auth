const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const { loginUserQuery, createUserMutation, deleteUserMutation } = require('./authSchema')
const { getPageQuery } = require('./pagesSchema');

// Reading data
const RootQuery = new GraphQLObjectType(
    {
        name: 'RootQueryType',
        fields:
        {
            loginUserQuery,
            getPageQuery
        }
    });

// Anything other than reading
const Mutation = new GraphQLObjectType(
    {
        name: 'Mutation',
        fields:
        {
            createUserMutation,
            deleteUserMutation
        }
    });


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});