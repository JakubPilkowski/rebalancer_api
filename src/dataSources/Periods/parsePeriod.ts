import { Period, PeriodUnit } from 'generated/graphql';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { IPeriodDocument } from 'models/PeriodModel';

export default function parsePeriod(document: IPeriodDocument): Period {
  const { unit, value } = document;

  const periodUnit = unit as PeriodUnit;
  return {
    ...parseApiNodeAttributes(document),
    unit: periodUnit,
    value,
  };
}
