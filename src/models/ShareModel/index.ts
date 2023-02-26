import mongoose, { Document, ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

const ShareSchema = new Schema<IShareModel>(
  {
    name: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    // orders: {},
    wage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export interface IShareModel extends IShareAttributes {
  _id: ObjectId;
}

export interface IShareAttributes {
  name: string;
  currency: string;
  wage: number;
  createdAt: NativeDate;
}

export type IShareDocument = Document<unknown, any, IShareModel> &
  IShareModel &
  Required<{
    _id: ObjectId;
  }>;

const ShareModel = mongoose.model<IShareAttributes>('Share', ShareSchema);

export default ShareModel;
