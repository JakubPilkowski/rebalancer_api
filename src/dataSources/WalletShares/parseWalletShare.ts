import { Share } from 'generated/graphql';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { IWalletShareDocument } from 'models/WalletShareModel';

export default function parseWalletShare(document: IWalletShareDocument): Share {
  const { ticker, wage } = document;
  return {
    ...parseApiNodeAttributes(document),
    ticker,
    wage,
  };
}
