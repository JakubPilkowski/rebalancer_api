import { Model } from 'mongoose';

import { MutationCreateWalletArgs } from 'generated/graphql';

import DepositModel from 'models/DepositModel';
import PeriodModel from 'models/PeriodModel';
import RebalanceStrategyModel from 'models/RebalanceStrategyModel';
import { IWalletDocument, IWalletModel } from 'models/WalletModel';
import WalletSettingsModel from 'models/WalletSettingsModel';
import ConnectionModel from 'models/ConnectionModel';
import NotificationModel from 'models/NotificationModel';

export default function createWallet(
  model: Model<IWalletModel>,
  args: MutationCreateWalletArgs
): IWalletDocument {
  const {
    input: { broker, currency, name, notifications, periodDeposit, periodUnit, periodValue },
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

  const walletNotifications = new NotificationModel({ daysBeforeNotify: notifications });

  // const walletShares = shares.map((share) => {
  //   if (!share)
  //     throw new Error(`createWallet: cannot create wallet share model. Share object is undefined`);
  //   const { ticker, wage } = share;
  //   return new WalletShareModel({ ticker, wage });
  // });

  return new model({
    name,
    currency,
    strategy: strategyDocument,
    wageStatus: 'UNSET',
    connections: [connection],
    notifications: walletNotifications,
    settings: walletSettingsDocument,
    shares: [],
  });
}
