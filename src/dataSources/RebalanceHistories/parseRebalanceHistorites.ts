import { RebalanceHistory, RebalanceHistoryStatus } from 'generated/graphql';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import {
  IRebalanceHistoryDocument,
  IRebalanceHistorySubdocument,
} from 'models/RebalanceHistoryModel';

import { parseWalletShare } from 'dataSources/WalletShares';

export default function parseRebalanceHistory(
  document: IRebalanceHistoryDocument | IRebalanceHistorySubdocument
): RebalanceHistory {
  const { status, shares } = document;

  const historyStatus = status as RebalanceHistoryStatus;

  const historyShares = shares.map((share) => parseWalletShare(share));

  return {
    ...parseApiNodeAttributes(document),
    status: historyStatus,
    shares: historyShares,
  };
}
