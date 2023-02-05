import * as dotenv from 'dotenv';
dotenv.config();

import { Connection } from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import serverlessExpress, { getCurrentInvoke } from '@vendia/serverless-express';
import { Handler, Context, Callback } from 'aws-lambda';
import cors from 'cors';

/**
 * Apollo server
 */
import apolloServer from 'config/createApolloServer';
import { expressMiddleware } from '@apollo/server/express4';

/**
 * data sources
 */
import dataSources from 'dataSources';
import connectDatabase from 'config/connectDatabase';

const app = express();

apolloServer.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

app.use(
  cors({
    origin: ['localhost', process.env.REBALANCER_APP as string],
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

app.use('/', (_, res) => {
  res.send(
    'Welcome to rebalancer api. To use api request redirect to /.netlify/functions/api/graphql path'
  );
});

let serverlessExpressInstance: Handler<any, unknown>;
let conn: Connection | null = null;

async function asyncTask() {
  if (!conn) {
    conn = await connectDatabase({ uri: process.env.MONGODB_URI as string });
  }
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
  context.callbackWaitsForEmptyEventLoop = false;

  if (serverlessExpressInstance)
    return serverlessExpressInstance({ ...event, requestContext: context }, context, () => {});

  return setup({ ...event, requestContext: context }, context, () => {});
}

exports.handler = handler;
