const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const dbConnectionString = generateConnectionString();
    await mongoose.connect(dbConnectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      connectTimeoutMS: parseInt(process.env.DATABASE_CONNECTION_TIME_OUT),
      socketTimeoutMS: parseInt(process.env.DATABASE_ACQUIRE_TIME_OUT),
    });
    console.log('Connected to Database');
  } catch (error) {
    console.error('Error connecting to Database:', error);
    throw error;
  }
};

const generateConnectionString = () => {
  const dbOptions = {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
  };
  return `mongodb://${dbOptions.host}:${dbOptions.port}/${dbOptions.database}`
};

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

module.exports = connectToDatabase;
