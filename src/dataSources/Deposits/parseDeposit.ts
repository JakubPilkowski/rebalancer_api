import { Deposit } from 'generated/graphql';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { IDepositDocument } from 'models/DepositModel';

export default function parseDeposit(document: IDepositDocument): Deposit {
  const { value, currency } = document;
  return {
    ...parseApiNodeAttributes(document),
    currency,
    value,
  };
}
