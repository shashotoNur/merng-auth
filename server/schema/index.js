const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const { loginUserQuery, createUserMutation, deleteUserMutation, updatePasswordMutation } = require('./authSchema')
const { getProfileQuery } = require('./profileSchema');

// Reading data
const QueryType = new GraphQLObjectType(
    {
        name: 'QueryType',
        fields:
        {
            loginUserQuery: loginUserQuery,
            getProfileQuery: getProfileQuery
        }
    });

// Anything other than reading
const MutationType = new GraphQLObjectType(
    {
        name: 'MutationType',
        fields:
        {
            createUserMutation: createUserMutation,
            deleteUserMutation: deleteUserMutation,
            updatePasswordMutation: updatePasswordMutation
        }
    });


module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});