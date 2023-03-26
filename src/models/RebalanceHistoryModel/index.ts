import mongoose, { Document, ObjectId, Types } from 'mongoose';

import IEntityAttributes from 'core/IEntityAttributes';
import ITimestampAttributes from 'core/ITimestampAttributes';
import IApiNodeAttributes from 'core/IApiNodeAttributes';

import { DepositSchema, IApiDeposit, IDepositSubdocument } from 'models/DepositModel';
import { IAPiPeriod, IPeriodSubdocument, PeriodSchema } from 'models/PeriodModel';
import { IApiWalletShare, IWalletShareModel, WalletShareSchema } from 'models/WalletShareModel';

const Schema = mongoose.Schema;

export const RebalanceHistorySchema = new Schema<IRebalanceHistoryModel>(
  {
    status: {
      type: String,
      required: true,
    },
    shares: [WalletShareSchema],
  },
  { timestamps: true }
);

export interface IRebalanceHistoryModel
  extends IEntityAttributes,
    IRebalanceHistoryAttributes,
    ITimestampAttributes {}

export interface IRebalanceHistoryAttributes {
  status: IRebalanceHistoryStatus;
  shares: Types.DocumentArray<IWalletShareModel>;
}

export type IRebalanceHistoryStatus = 'SKIPPED' | 'DONE' | 'REMOVED';

export interface IApiRebalanceHistory extends IApiNodeAttributes {
  status: IRebalanceHistoryStatus;
  shares: IApiWalletShare[];
}

export type IRebalanceHistoryDocument = Document<unknown, any, IRebalanceHistoryModel> &
  IRebalanceHistoryModel &
  Required<{
    _id: ObjectId;
  }>;

export type IRebalanceHistorySubdocument = Types.Subdocument & IRebalanceHistoryModel;

const RebalanceHistoryModel = mongoose.model<IRebalanceHistoryAttributes>(
  'RebalanceHistory',
  RebalanceHistorySchema
);

export default RebalanceHistoryModel;
