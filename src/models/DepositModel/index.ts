import mongoose, { Document, ObjectId, Types } from 'mongoose';

import ITimestampAttributes from 'core/ITimestampAttributes';
import IEntityAttributes from 'core/IEntityAttributes';
import IApiNodeAttributes from 'core/IApiNodeAttributes';

const Schema = mongoose.Schema;

export const DepositSchema = new Schema<IDepositModel>(
  {
    value: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export interface IDepositModel
  extends IEntityAttributes,
    IDepositAttributes,
    ITimestampAttributes {}

export interface IDepositAttributes {
  value: number;
  currency: string;
}

export interface IApiDeposit extends IApiNodeAttributes {
  value: number;
  date: string;
  currency: string;
}

export type IDepositDocument = Document<unknown, any, IDepositModel> &
  IDepositModel &
  Required<{
    _id: ObjectId;
  }>;

export type IDepositSubdocument = Types.Subdocument & IDepositModel;

const DepositModel = mongoose.model<IDepositAttributes>('Deposit', DepositSchema);

export default DepositModel;
