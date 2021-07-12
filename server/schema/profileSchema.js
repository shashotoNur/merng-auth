const { GraphQLObjectType, GraphQLString } = require('graphql');

const { getProfile } = require('../controllers/profileController');

// Return types
const ProfileType = new GraphQLObjectType(
    {
        name: 'Page',
        fields: () => ({
            status: { type: GraphQLString }
        })
    });

// Queries and Mutations
const getProfileQuery = {
    type: ProfileType,
    resolve(_parent, _args) { return getProfile(); }
};

module.exports = { getProfileQuery };