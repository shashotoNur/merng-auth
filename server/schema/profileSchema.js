const { GraphQLObjectType, GraphQLString } = require('graphql');

const { getProfile } = require('../controllers/profileController');

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
    resolve(context) { return getProfile(context); }
};

module.exports = { getProfileQuery };