const { GraphQLObjectType, GraphQLString } = require('graphql');

const { getProfile } = require('../controllers/profileController');

// Return types
const ProfileType = new GraphQLObjectType(
    {
        name: 'ProfileType',
        fields: () => ({
            status:{ type: GraphQLString },
        })
    });

// Queries and Mutations
const getProfileQuery = {
    type: ProfileType,
    resolve() { return getProfile(); }
};

module.exports = { getProfileQuery };