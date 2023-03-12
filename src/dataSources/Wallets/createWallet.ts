import { MutationCreateWalletArgs } from 'generated/graphql';
import DepositModel from 'models/DepositModel';
import PeriodModel from 'models/PeriodModel';
import RebalanceStrategyModel, { IRebalanceStrategyModel } from 'models/RebalanceStrategyModel';
import WalletModel, { IWalletModel } from 'models/WalletModel';
import WalletSettingsModel from 'models/WalletSettingsModel';

export default function createWallet(args: MutationCreateWalletArgs): IWalletModel {
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

  return new WalletModel({
    name,
    currency,
    strategy: strategyDocument,
    connections: [],
    notifications: [],
    settings: walletSettingsDocument,
    shares: [],
  });
}
