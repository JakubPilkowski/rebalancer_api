import mongoose, { Document, ObjectId, Types } from 'mongoose';

import IApiNodeAttributes from 'core/IApiNodeAttributes';
import IEntityAttributes from 'core/IEntityAttributes';
import ITimestampAttributes from 'core/ITimestampAttributes';

const Schema = mongoose.Schema;

export const WalletShareSchema = new Schema<IWalletShareModel>(
  {
    ticker: {
      type: String,
      required: true,
    },
    status: {
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

/**
 * SKIPPED - doesn't take part in rebalance but its required for equality check
 * DRAFT - doesn't exist in real account but it takes part in rebalance
 * DRAFT-SKIPPED - DRAFT + SKIPPED status
 * INCLUED - exist in real account and it takes part in rebalance
 */
export type IWalletShareStatus = 'DRAFT' | 'SKIPPED' | 'SKIPPED-DRAFT' | 'INCLUDED';

export interface IWalletShareAttributes {
  ticker: string;
  volume: number;
  status: IWalletShareStatus;
  wage: number;
}

export interface IApiWalletShare extends IApiNodeAttributes {
  ticker: string;
  status: IWalletShareStatus;
  wage: number;
}

export type IWalletShareDocument = Document<unknown, any, IWalletShareModel> &
  IWalletShareModel &
  Required<{
    _id: ObjectId;
  }>;

export type IWalletShareSubdocument = Types.Subdocument & IWalletShareModel;

const WalletShareModel = mongoose.model<IWalletShareAttributes>('WalletShare', WalletShareSchema);

export default WalletShareModel;
