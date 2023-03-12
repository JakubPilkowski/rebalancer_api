import IApiNodeAttributes from 'core/IApiNodeAttributes';
import IEntityAttributes from 'core/IEntityAttributes';
import ITimestampAttributes from 'core/ITimestampAttributes';
import mongoose, { Document, ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

export const WalletShareSchema = new Schema<IWalletShareModel>(
  {
    ticker: {
      type: String,
      required: true,
    },
    wage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export interface IWalletShareModel
  extends IEntityAttributes,
    IWalletShareAttributes,
    ITimestampAttributes {}

export interface IWalletShareAttributes {
  ticker: string;
  wage: number;
}

export interface IApiWalletShare extends IApiNodeAttributes {
  ticker: string;
  wage: number;
}

export type IWalletShareDocument = Document<unknown, any, IWalletShareModel> &
  IWalletShareModel &
  Required<{
    _id: ObjectId;
  }>;

const WalletShareModel = mongoose.model<IWalletShareAttributes>('WalletShare', WalletShareSchema);

export default WalletShareModel;
