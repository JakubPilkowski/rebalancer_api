import { RebalanceStrategy } from 'generated/graphql';

import { parseDeposit } from 'dataSources/Deposits';
import { parsePeriod } from 'dataSources/Periods';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import {
  IRebalanceStrategyDocument,
  IRebalanceStrategySubdocument,
} from 'models/RebalanceStrategyModel';

export default function parseRebalanceStrategy(
  document: IRebalanceStrategyDocument | IRebalanceStrategySubdocument
): RebalanceStrategy {
  const { period, periodDeposit } = document;

  return {
    ...parseApiNodeAttributes(document),
    periodDeposit: parseDeposit(periodDeposit),
    period: parsePeriod(period),
  };
}
