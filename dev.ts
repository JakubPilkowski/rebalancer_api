import * as dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import express from 'express';

import { expressMiddleware } from '@apollo/server/express4';

import dataSources from 'dataSources';

import apolloServer from 'config/createApolloServer';
import connectDatabase from 'config/connectDatabase';

const startApplication = async (): Promise<void> => {
  const app = express();

  await connectDatabase({ uri: process.env.MONGODB_URI as string });

  await apolloServer.start();

  app.listen(4000, () => {
    console.log('Server ready');
  });

  app.use(
    '/graphql',
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async () => {
        return {
          dataSources,
        };
      },
    })
  );

  app.use('/', (_, res) => {
    res.send('Welcome to rebalancer api. To use api request redirect to /graphql path');
  });
};

startApplication();
