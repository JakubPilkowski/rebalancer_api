import mongoose, { Document, ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

const RebalanceStrategySchema = new Schema<IRebalanceStrategyModel>(
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

export interface IRebalanceStrategyModel extends IRebalanceStrategyAttributes {
  _id: ObjectId;
}

export interface IRebalanceStrategyAttributes {
  name: string;
  currency: string;
  wage: number;
  createdAt: NativeDate;
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
