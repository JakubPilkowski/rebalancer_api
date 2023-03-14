import { Wallet } from 'generated/graphql';

import parseRebalanceStrategy from 'dataSources/RebalanceStrategies/parseRebalanceStrategy';
import { parseWalletSettings } from 'dataSources/WalletSettings';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { IWalletDocument } from 'models/WalletModel';

export default async function parseWallet(wallet: IWalletDocument): Promise<Wallet> {
  const { id, name, currency, settings, strategy } = wallet;

  const walletSettings = await parseWalletSettings(settings);

  const walletStrategy = await parseRebalanceStrategy(strategy);

  return {
    ...parseApiNodeAttributes(wallet),
    name,
    currency,
    connections: [],
    notifications: [],
    settings: walletSettings,
    shares: [],
    strategy: walletStrategy,
  };
}
