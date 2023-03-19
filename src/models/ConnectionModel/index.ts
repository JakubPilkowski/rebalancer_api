import mongoose, { Document, ObjectId, Types } from 'mongoose';

import ITimestampAttributes from 'core/ITimestampAttributes';
import IEntityAttributes from 'core/IEntityAttributes';
import IApiNodeAttributes from 'core/IApiNodeAttributes';

const Schema = mongoose.Schema;

export const ConnectionSchema = new Schema<IConnectionModel>(
  {
    broker: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export interface IConnectionModel
  extends IEntityAttributes,
    IConnectionAttributes,
    ITimestampAttributes {}

export type IConnectionBroker = 'XTB';

export interface IConnectionAttributes {
  broker: IConnectionBroker;
}

export interface IApiConnection extends IApiNodeAttributes {
  broker: IConnectionBroker;
}

export type IConnectionDocument = Document<unknown, any, IConnectionModel> &
  IConnectionModel &
  Required<{
    _id: ObjectId;
  }>;

export type IConnectionSubdocument = Types.Subdocument & IConnectionModel;

const ConnectionModel = mongoose.model<IConnectionAttributes>('Connection', ConnectionSchema);

export default ConnectionModel;
