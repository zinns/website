import { ApolloServer } from 'apollo-server-micro';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginCacheControl,
} from 'apollo-server-core';
import Cors from 'micro-cors';
import connectDB from 'config/db';
import resolvers from 'config/graphql/resolvers';
import typeDefs from 'config/graphql/typeDefs';
import { verifyToken } from 'utils/jwt';
import { migration } from 'config/db/migration';

const cors = Cors();

let migrationScriptRan = false;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ctx => {
    const cookies = ctx.req.headers['cookie'] || '';

    if (cookies !== '') {
      try {
        const token = cookies
          .split(' ')
          .filter((cookie: string) => cookie.includes('token'))[0]
          .split('=')[1];
        const user = verifyToken(token);
        return { user };
      } catch (error) {
        console.log(error);
      }
    }
    return;
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground(), ApolloServerPluginCacheControl()],
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  try {
    await connectDB();

    if (migrationScriptRan) {
      await migration();

      migrationScriptRan = true;
    }

    if (req.method === 'OPTIONS') {
      res.end();
      return false;
    }
    await startServer;

    await apolloServer.createHandler({
      path: '/api/graphql',
    })(req, res);
  } catch (error) {
    console.log(error);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
