import mongoose, { Document, ObjectId, Types } from 'mongoose';

import ITimestampAttributes from 'core/ITimestampAttributes';
import IEntityAttributes from 'core/IEntityAttributes';
import IApiNodeAttributes from 'core/IApiNodeAttributes';

const Schema = mongoose.Schema;

export const NotificationSchema = new Schema<INotificationModel>(
  {
    daysBeforeNotify: [
      {
        type: Number,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export interface INotificationModel
  extends IEntityAttributes,
    INotificationAttributes,
    ITimestampAttributes {}

export interface INotificationAttributes {
  daysBeforeNotify: number[];
}

export interface IApiNotification extends IApiNodeAttributes {
  daysBeforeNotify: number[];
}

export type INotificationDocument = Document<unknown, any, INotificationModel> & INotificationModel;

export type INotificationSubdocument = Types.Subdocument & INotificationModel;

const NotificationModel = mongoose.model<INotificationAttributes>(
  'Notification',
  NotificationSchema
);

export default NotificationModel;
