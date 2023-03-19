import mongoose, { Document, ObjectId, Types } from 'mongoose';

import IEntityAttributes from 'core/IEntityAttributes';
import ITimestampAttributes from 'core/ITimestampAttributes';
import IApiNodeAttributes from 'core/IApiNodeAttributes';

import { DepositSchema, IApiDeposit, IDepositSubdocument } from 'models/DepositModel';
import { IAPiPeriod, IPeriodSubdocument, PeriodSchema } from 'models/PeriodModel';

const Schema = mongoose.Schema;

export const RebalanceStrategySchema = new Schema<IRebalanceStrategyModel>(
  {
    period: PeriodSchema,
    periodDeposit: DepositSchema,
  },
  { timestamps: true }
);

export interface IRebalanceStrategyModel
  extends IEntityAttributes,
    IRebalanceStrategyAttributes,
    ITimestampAttributes {}

export interface IRebalanceStrategyAttributes {
  period: IPeriodSubdocument;
  periodDeposit: IDepositSubdocument;
}

export interface IApiRebalanceStrategy extends IApiNodeAttributes {
  period: IAPiPeriod;
  periodDeposit: IApiDeposit;
}

export type IRebalanceStrategyDocument = Document<unknown, any, IRebalanceStrategyModel> &
  IRebalanceStrategyModel &
  Required<{
    _id: ObjectId;
  }>;

export type IRebalanceStrategySubdocument = Types.Subdocument & IRebalanceStrategyModel;

const RebalanceStrategyModel = mongoose.model<IRebalanceStrategyAttributes>(
  'RebalanceStrategy',
  RebalanceStrategySchema
);

export default RebalanceStrategyModel;
