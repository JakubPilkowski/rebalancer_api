import { Share } from 'generated/graphql';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { IWalletShareDocument, IWalletShareSubdocument } from 'models/WalletShareModel';

export default function parseWalletShare(
  document: IWalletShareDocument | IWalletShareSubdocument
): Share {
  const { ticker, wage } = document;
  return {
    ...parseApiNodeAttributes(document),
    ticker,
    wage,
  };
}
