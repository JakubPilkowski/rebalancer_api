import { Wallet } from 'generated/graphql';

import parseRebalanceStrategy from 'dataSources/RebalanceStrategies/parseRebalanceStrategy';
import { parseWalletSettings } from 'dataSources/WalletSettings';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { IRebalanceStrategyDocument } from 'models/RebalanceStrategyModel';
import WalletModel, { IWalletDocument } from 'models/WalletModel';
import WalletSettingsModel, { IWalletSettingsDocument } from 'models/WalletSettingsModel';

export default async function parseWallet(wallet: IWalletDocument): Promise<Wallet> {
  const { id, name, currency } = wallet;

  // const connections = WalletModel.find().populate('connections');

  const settings = (await WalletSettingsModel.findById(id)) as IWalletSettingsDocument | null;

  if (!settings) {
    throw new Error(`Cannot parse Wallet document. Settings document is null`);
  }

  const strategy = (await WalletModel.findById(id)) as IRebalanceStrategyDocument | null;

  if (!strategy) {
    throw new Error(`Cannot parse Wallet document. Strategy document is null`);
  }

  const walletStrategy = await parseRebalanceStrategy(strategy);

  return {
    ...parseApiNodeAttributes(wallet),
    name,
    currency,
    connections: [],
    notifications: [],
    settings: parseWalletSettings(settings),
    shares: [],
    strategy: walletStrategy,
  };
}
