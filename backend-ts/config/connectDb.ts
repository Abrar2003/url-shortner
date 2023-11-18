// mongodbConnect.ts

import mongoose, { Connection } from 'mongoose';

const connect: ConnectFunction = async () => {
  try {
    const uri: string = process.env.MONGODB_URI || '';
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the environment variables.');
    }

    const options: ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };

    await mongoose.connect(uri, options);

    const dbConnection: Connection = mongoose.connection;
    dbConnection.once('open', () => {
      console.log('Connected to MongoDB');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connect;
