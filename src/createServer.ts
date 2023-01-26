import * as dotenv from 'dotenv';
dotenv.config();

import mongoose, { Connection } from 'mongoose';

// import express from 'express';
// import bodyParser from 'body-parser';
// import http from 'http';
// import serverless from 'serverless-http';

/**
 * Apollo server
 */
import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

/**
 * graphql schema, resolvers
 */
import graphqlSchema from './graphql/schema';
import graphqlResolvers from './graphql/resolvers';

/**
 * data sources
 */
import dataSources, { IDataSources } from './dataSources';

export interface ApolloContextValue {
  dataSources: IDataSources;
}

const connectDatabase = async (): Promise<Connection> => {
  const mongoDatabase = process.env.MONGODB_URI as string;

  mongoose.set('strictQuery', false);

  await mongoose
    .connect(mongoDatabase, {
      // those functions are right now set by default
      // useNewUrlParser: true,
      // useFindAndModify: false,
      // useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to mongodb database'))
    .catch((err: unknown) => console.error(err));

  return mongoose.connection;
};

// const startApplication = async (): Promise<Express.Application> => {
connectDatabase();

// const app = express();

// const httpServer = http.createServer(app);

const apolloServer = new ApolloServer<ApolloContextValue>({
  typeDefs: graphqlSchema,
  resolvers: graphqlResolvers,
  // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

export default apolloServer;
