import mongoose, { Document, ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

const WalletDepositSchema = new Schema<IWalletDepositModel>(
  {
    value: {
      type: Number,
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export interface IWalletDepositModel extends IWalletDepositAttributes {
  _id: ObjectId;
}

export interface IWalletDepositAttributes {
  value: number;
  transactionDate: NativeDate;
  createdAt: NativeDate;
}

export type IWalletDepositDocument = Document<unknown, any, IWalletDepositModel> &
  IWalletDepositModel &
  Required<{
    _id: ObjectId;
  }>;

const WalletDepositModel = mongoose.model<IWalletDepositAttributes>(
  'WalletDeposit',
  WalletDepositSchema
);

export default WalletDepositModel;
