import mongoose from 'mongoose';

export function DB_Register() {
  const db: { connected: boolean; connections: mongoose.Connection[] | null } = {
    connected: false,
    connections: null,
  };

  return function ({
    connections,
    terminate,
  }: {
    connections?: mongoose.Connection[];
    terminate?: boolean;
  }) {
    if (connections) {
      db.connected = true;
      db.connections = connections;
    }

    if (terminate) {
      db.connected = false;
      db.connections = null;
    }

    return db;
  };
}

export const DB = DB_Register();

export async function connectDB() {
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

  if (DB({}).connected) {
    console.log('There is already a DB connection', DB({}));
  } else {
    const opts = {
      bufferCommands: false,
    };

    try {
      console.log(`Connecting to database in ${process.env.NODE_ENV.toLowerCase()} environment`);
      const connection = await mongoose.connect(getMongoDBuri() as string, opts);

      console.log(`Database in ${process.env.NODE_ENV.toLowerCase()} environment connected`);

      DB({ connections: connection.connections });
      console.log(DB({}));
    } catch (error) {
      mongoose.disconnect();
      console.log(error);
      console.log(
        `Something happened trying to connect database in ${process.env.NODE_ENV.toLowerCase()} environment`,
        DB({}),
      );
    }
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    DB({ terminate: true });
    console.log(DB({}));
  } catch (error) {
    console.log(DB({}));
    console.log(error);
  }
}
