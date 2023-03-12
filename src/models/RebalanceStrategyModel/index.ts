import mongoose, { Document, ObjectId, Types } from 'mongoose';

import IEntityAttributes from 'core/IEntityAttributes';
import ITimestampAttributes from 'core/ITimestampAttributes';
import IApiNodeAttributes from 'core/IApiNodeAttributes';

import { DepositSchema, IApiDeposit, IDepositModel } from 'models/DepositModel';
import { IAPiPeriod, IPeriodModel, PeriodSchema } from 'models/PeriodModel';

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
  period: Types.Subdocument<IPeriodModel>;
  periodDeposit: Types.Subdocument<IDepositModel>;
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

const RebalanceStrategyModel = mongoose.model<IRebalanceStrategyAttributes>(
  'RebalanceStrategy',
  RebalanceStrategySchema
);

export default RebalanceStrategyModel;
