import mongoose from 'mongoose';

const connectToDatabase = async (env: string) => {
  const databaseURL = env === 'production' ? process.env.PROD_DATABASE_URL : process.env.DEV_DATABASE_URL;

  try {
    await mongoose.connect(databaseURL);
    console.log('Connected to MongoDB Database!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToDatabase;
