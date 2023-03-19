import { Wallet, WalletWageStatus } from 'generated/graphql';

import parseRebalanceStrategy from 'dataSources/RebalanceStrategies/parseRebalanceStrategy';
import { parseWalletSettings } from 'dataSources/WalletSettings';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { IWalletDocument } from 'models/WalletModel';
import { parseConnection } from 'dataSources/Connections';
import { parseNotification } from 'dataSources/Notifications';
import { parseWalletShare } from 'dataSources/WalletShares';

export default function parseWallet(wallet: IWalletDocument): Wallet {
  const { name, currency, settings, connections, notifications, shares, wageStatus, strategy } =
    wallet;

  const walletWageStatus = wageStatus as WalletWageStatus;

  const walletSettings = parseWalletSettings(settings);

  const walletStrategy = parseRebalanceStrategy(strategy);

  const walletConnections = connections.map((connection) => parseConnection(connection));

  const walletNotifications = notifications.map((notification) => parseNotification(notification));

  const walletShares = shares.map((share) => parseWalletShare(share));

  return {
    ...parseApiNodeAttributes(wallet),
    name,
    currency,
    connections: walletConnections,
    notifications: walletNotifications,
    wageStatus: walletWageStatus || 'UNSET',
    settings: walletSettings,
    shares: walletShares,
    strategy: walletStrategy,
  };
}
