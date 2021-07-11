const mongoose = require('mongoose');

const connectToDatabase = async () =>
  {
    try
    {
      const conn = await mongoose.connect(process.env.MONGO_URI,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex:true,
          useFindAndModify: false
        });

      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }

    catch (err)
    {
      console.error(err);
      process.exit(1);
    };
  };

module.exports = connectToDatabase;