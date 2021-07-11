const app = require('./config/app');
const connectToDatabase = require('./config/db');

( async () =>
    {
        await connectToDatabase();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running at localhost:${PORT}${process.env.GRAPHQL_ROUTE}`));
    }
);