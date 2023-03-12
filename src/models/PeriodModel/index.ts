import mongoose, { Document, ObjectId } from 'mongoose';

import IEntityAttributes from 'core/IEntityAttributes';
import ITimestampAttributes from 'core/ITimestampAttributes';
import IApiNodeAttributes from 'core/IApiNodeAttributes';

const Schema = mongoose.Schema;

export const PeriodSchema = new Schema<IPeriodModel>(
  {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      requied: true,
    },
  },
  { timestamps: true }
);

export interface IPeriodModel extends IEntityAttributes, IPeriodAttributes, ITimestampAttributes {}

export type IPeriodUnit = 'month' | 'year';

export interface IPeriodAttributes {
  value: number;
  unit: IPeriodUnit;
}

export interface IAPiPeriod extends IApiNodeAttributes {
  value: number;
  unit: IPeriodUnit;
}

export type IPeriodDocument = Document<unknown, any, IPeriodModel> &
  IPeriodModel &
  Required<{
    _id: ObjectId;
  }>;

const PeriodModel = mongoose.model<IPeriodAttributes>('Period', PeriodSchema);

export default PeriodModel;
