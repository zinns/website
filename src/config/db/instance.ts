import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null };
}

const opts = {
  bufferCommands: false,
};

const getMongoDBuri = () => {
  const uri =
    process.env.NODE_ENV.toLowerCase() !== 'production'
      ? process.env.ERP_DEV_URI
      : process.env.ERP_PROD_URI;

  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  return uri;
};

export const DB = {
  connected: cached.connection,
  connect,
  disconnect,
};

export async function connect() {
  try {
    if (cached.connection) {
      return;
    }

    console.log(`Connecting to database in ${process.env.NODE_ENV.toLowerCase()} environment`);

    cached.connection = await mongoose.connect(getMongoDBuri(), opts);

    console.log(`Database in ${process.env.NODE_ENV.toLowerCase()} environment connected`);

    return cached.connection;
  } catch (error) {
    console.log(error);
    mongoose.disconnect();
    console.log(
      `Something happened trying to connect database in ${process.env.NODE_ENV.toLowerCase()} environment`,
    );
  }
}

export async function disconnect() {
  console.log(`Disconnecting to database in ${process.env.NODE_ENV.toLowerCase()} environment`);

  if (cached.connection) {
    mongoose
      .disconnect()
      .then(() => {
        console.log(`Database in ${process.env.NODE_ENV.toLowerCase()} environment disconnected`);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
