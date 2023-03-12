import IApiNodeAttributes from 'core/IApiNodeAttributes';
import IEntityAttributes from 'core/IEntityAttributes';
import ITimestampAttributes from 'core/ITimestampAttributes';

import mongoose, { Document, ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

export const WalletSettingsSchema = new Schema<IWalletSettingsModel>(
  {
    hasNotificationsSilenced: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export interface IWalletSettingsModel
  extends IEntityAttributes,
    IWalletSettingsAttributes,
    ITimestampAttributes {}

export interface IWalletSettingsAttributes {
  hasNotificationsSilenced: boolean;
}

export interface IApiWalletSettings extends IApiNodeAttributes {
  hasNotificationsSilenced: boolean;
}

export type IWalletSettingsDocument = Document<unknown, any, IWalletSettingsModel> &
  IWalletSettingsModel &
  Required<{
    _id: ObjectId;
  }>;

const WalletSettingsModel = mongoose.model<IWalletSettingsAttributes>(
  'WalletSettings',
  WalletSettingsSchema
);

export default WalletSettingsModel;
