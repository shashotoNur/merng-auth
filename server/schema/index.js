const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const { loginUserQuery, createUserMutation } = require('./authSchema')
const { getProfileQuery, deleteUserMutation, updatePasswordMutation } = require('./profileSchema');

// Reading data
const QueryType = new GraphQLObjectType(
    {
        name: 'QueryType',
        fields:
        {
            loginUserQuery,
            getProfileQuery
        }
    });

// Anything other than reading
const MutationType = new GraphQLObjectType(
    {
        name: 'MutationType',
        fields:
        {
            createUserMutation,
            deleteUserMutation,
            updatePasswordMutation
        }
    });


module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});