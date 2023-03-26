import { Share, ShareStatus } from 'generated/graphql';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { IWalletShareDocument, IWalletShareSubdocument } from 'models/WalletShareModel';

export default function parseWalletShare(
  document: IWalletShareDocument | IWalletShareSubdocument
): Share {
  const { ticker, status, volume, wage } = document;

  const shareStatus = status as ShareStatus;

  return {
    ...parseApiNodeAttributes(document),
    status: shareStatus,
    volume,
    ticker,
    wage,
  };
}
