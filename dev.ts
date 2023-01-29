import bodyParser from 'body-parser';
import express from 'express';

import { expressMiddleware } from '@apollo/server/express4';

import apolloServer from './createServer';
import dataSources from './src/dataSources';

const startApplication = async (): Promise<void> => {
  const app = express();

  // const httpServer = http.createServer(app);

  // const apolloServer = new ApolloServer<ApolloContextValue>({
  //   typeDefs: graphqlSchema,
  //   resolvers: graphqlResolvers,
  //   // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // });

  await apolloServer.start();

  app.use(
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async () => {
        return {
          dataSources,
        };
      },
    })
  );

  app.listen(4000, () => {
    console.log('Server ready');
  });
};

startApplication();

// await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve)).then(() =>
//   console.log(`🚀 Server ready`)
// );
