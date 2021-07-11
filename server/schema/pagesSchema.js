const { GraphQLObjectType, GraphQLString } = require('graphql');

const { getPage } = require('../controllers/pagesController');

// Return types
const PageType = new GraphQLObjectType(
    {
        name: 'Page',
        fields: () => ({
            status: { type: GraphQLString }
        })
    });

// Queries and Mutations
const getPageQuery = {
    type: PageType,
    resolve(_parent, _args) { return getPage(); }
};

module.exports = { getPageQuery };