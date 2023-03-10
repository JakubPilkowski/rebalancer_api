import mongoose, { Document, ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

const WalletSchema = new Schema<IWalletModel>(
  {
    name: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export interface IWalletModel extends IWalletAttributes {
  _id: ObjectId;
}

export interface IWalletAttributes {
  name: string;
  currency: string;
  createdAt: NativeDate;
}

export type IWalletDocument = Document<unknown, any, IWalletModel> &
  IWalletModel &
  Required<{
    _id: ObjectId;
  }>;

const WalletModel = mongoose.model<IWalletAttributes>('Wallet', WalletSchema);

export default WalletModel;
