import { Period, PeriodUnit } from 'generated/graphql';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { IPeriodDocument, IPeriodSubdocument } from 'models/PeriodModel';

export default function parsePeriod(document: IPeriodDocument | IPeriodSubdocument): Period {
  const { unit, value } = document;

  const periodUnit = unit as PeriodUnit;
  return {
    ...parseApiNodeAttributes(document),
    unit: periodUnit,
    value,
  };
}
