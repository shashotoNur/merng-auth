const app = require('express')();
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const schema = require('../schema/');
const { requireAuth } = require('../middleware/authMiddleware');

dotenv.config({ path: './config.env' });

app.use( cors() );
app.use(requireAuth);
app.use(process.env.GRAPHQL_ROUTE, graphqlHTTP(
  {
    schema: schema,
    context: ({ req, res }) => ({ req, res }),
    graphiql: true
  })
);

module.exports = app;