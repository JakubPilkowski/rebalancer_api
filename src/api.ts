import * as dotenv from 'dotenv';
dotenv.config();

import mongoose, { Connection } from 'mongoose';

import express from 'express';
import bodyParser from 'body-parser';
import serverlessExpress, { getCurrentInvoke } from '@vendia/serverless-express';
import { Handler, Context, Callback } from 'aws-lambda';
import cors from 'cors';

/**
 * Apollo server
 */
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

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

const app = express();

const apolloServer = new ApolloServer<ApolloContextValue>({
  typeDefs: graphqlSchema,
  resolvers: graphqlResolvers,
  // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

apolloServer.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

app.use(
  cors({
    origin: ['localhost', '<rebalancer_url>'],
  })
);

app.use(
  '/.netlify/functions/api/graphql',
  bodyParser.json(),
  expressMiddleware(apolloServer, {
    context: async ({ req, res }) => {
      const { event, context } = getCurrentInvoke();

      return {
        expressRequest: req,
        expressResponse: res,
        lambdaEvent: event,
        lambdaContext: context,
        dataSources,
      };
    },
  })
);

let serverlessExpressInstance: Handler<any, unknown>;

async function asyncTask() {
  await connectDatabase();
  return true;
}

async function setup(
  event: any,
  context: Context,
  callback: Callback<unknown>
): Promise<void | unknown> {
  await asyncTask();
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context, callback);
}

function handler(event: any, context: Context): void | unknown {
  if (serverlessExpressInstance)
    return serverlessExpressInstance({ ...event, requestContext: context }, context, () => {});

  return setup({ ...event, requestContext: context }, context, () => {});
}

exports.handler = handler;
