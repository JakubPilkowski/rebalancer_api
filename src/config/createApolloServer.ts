import { ApolloServer } from '@apollo/server';

/**
 * graphql schema, resolvers
 */
import graphqlSchema from 'schema';
import graphqlResolvers from 'resolvers';

import { IDataSources } from 'dataSources';

export interface ApolloContextValue {
  dataSources: IDataSources;
}

const apolloServer = new ApolloServer<ApolloContextValue>({
  typeDefs: graphqlSchema,
  resolvers: graphqlResolvers,
});

export default apolloServer;
