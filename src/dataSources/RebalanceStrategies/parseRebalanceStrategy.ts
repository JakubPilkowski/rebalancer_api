import { RebalanceStrategy } from 'generated/graphql';

import { parseDeposit } from 'dataSources/Deposits';
import { parsePeriod } from 'dataSources/Periods';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { IRebalanceStrategyDocument } from 'models/RebalanceStrategyModel';
import DepositModel, { IDepositDocument } from 'models/DepositModel';
import PeriodModel, { IPeriodDocument } from 'models/PeriodModel';

export default async function parseRebalanceStrategy(
  document: IRebalanceStrategyDocument
): Promise<RebalanceStrategy> {
  const { period, periodDeposit } = document;

  const strategyPeriod = (await PeriodModel.findById(period._id)) as IPeriodDocument | null;

  if (!strategyPeriod) {
    throw new Error(`Cannot parse Wallet document. Settings document is null`);
  }

  const strategyPeriodDeposit = (await DepositModel.findById(
    periodDeposit._id
  )) as IDepositDocument | null;

  if (!strategyPeriodDeposit) {
    throw new Error(`Cannot parse Wallet document. Settings document is null`);
  }

  return {
    ...parseApiNodeAttributes(document),
    periodDeposit: parseDeposit(strategyPeriodDeposit),
    period: parsePeriod(strategyPeriod),
  };
}
