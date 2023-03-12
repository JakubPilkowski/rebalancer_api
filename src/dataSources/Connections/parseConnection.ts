import { Connection, ConnectionBroker } from 'generated/graphql';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { IConnectionDocument } from 'models/ConnectionModel';

export default function parseConnection(document: IConnectionDocument): Connection {
  const { broker } = document;

  const connectionBroker = broker as ConnectionBroker;

  return {
    ...parseApiNodeAttributes(document),
    broker: connectionBroker,
  };
}
