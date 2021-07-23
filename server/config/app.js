const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const schema = require('../schema/');
const { getReqUser } = require('../middleware/getReqUser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = { origin: 'http://localhost:3000', credentials: true };
app.use(cors(corsOptions));

app.use(getReqUser);

app.use(process.env.GRAPHQL_ROUTE, graphqlHTTP((_req, res) =>
    ({
      schema: schema,
      context: { user: res?.locals?.user },
      graphiql: true
    })
  )
);


console.log('Express app initialised!');

module.exports = app;