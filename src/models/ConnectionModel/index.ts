import mongoose, { Document, ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

const ConnectionSchema = new Schema<IConnectionModel>(
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

export interface IConnectionModel extends IConnectionAttributes {
  _id: ObjectId;
}

export type IConnectionProvider = 'XTB';

export interface IConnectionAttributes {
  provider: IConnectionProvider;
}

export type IConnectionDocument = Document<unknown, any, IConnectionModel> &
  IConnectionModel &
  Required<{
    _id: ObjectId;
  }>;

const ConnectionModel = mongoose.model<IConnectionAttributes>('Connection', ConnectionSchema);

export default ConnectionModel;
