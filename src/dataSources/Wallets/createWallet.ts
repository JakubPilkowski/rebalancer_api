import { Model } from 'mongoose';

import { MutationCreateWalletArgs } from 'generated/graphql';

import DepositModel from 'models/DepositModel';
import PeriodModel from 'models/PeriodModel';
import RebalanceStrategyModel from 'models/RebalanceStrategyModel';
import { IWalletDocument, IWalletModel } from 'models/WalletModel';
import WalletSettingsModel from 'models/WalletSettingsModel';
import ConnectionModel from 'models/ConnectionModel';
import NotificationModel from 'models/NotificationModel';
import WalletShareModel from 'models/WalletShareModel';

export default function createWallet(
  model: Model<IWalletModel>,
  args: MutationCreateWalletArgs
): IWalletDocument {
  const {
    input: {
      broker,
      currency,
      name,
      notifications,
      periodDeposit,
      periodUnit,
      periodValue,
      shares,
    },
  } = args;

  const strategyPeriodDocument = new PeriodModel({ unit: periodUnit, value: periodValue });
  const strategyPeriodDepositDocument = new DepositModel({ currency, value: periodDeposit });

  const strategyDocument = new RebalanceStrategyModel({
    period: strategyPeriodDocument,
    periodDeposit: strategyPeriodDepositDocument,
  });

  const walletSettingsDocument = new WalletSettingsModel({
    hasNotificationsSilenced: false,
  });

  const connection = new ConnectionModel({
    broker,
  });

  const walletNotifications = notifications.map((notification) => {
    return new NotificationModel({
      daysBeforeNotify: notification,
    });
  });

  const walletShares = shares.map((share) => {
    if (!share)
      throw new Error(`createWallet: cannot create wallet share model. Share object is undefined`);
    const { ticker, wage } = share;
    return new WalletShareModel({ ticker, wage });
  });

  return new model({
    name,
    currency,
    strategy: strategyDocument,
    connections: [connection],
    notifications: walletNotifications,
    settings: walletSettingsDocument,
    shares: walletShares,
  });

  // return new WalletModel({
  //   name,
  //   currency,
  //   strategy: strategyDocument,
  //   connections: [],
  //   notifications: [],
  //   settings: walletSettingsDocument,
  //   shares: [],
  // });
}
