import mongoose, { Document, Types } from 'mongoose';

import ITimestampAttributes from 'core/ITimestampAttributes';
import IEntityAttributes from 'core/IEntityAttributes';
import IApiNodeAttributes from 'core/IApiNodeAttributes';

import {
  IApiRebalanceStrategy,
  IRebalanceStrategySubdocument,
  RebalanceStrategySchema,
} from 'models/RebalanceStrategyModel';
import { IApiWalletShare, IWalletShareModel, WalletShareSchema } from 'models/WalletShareModel';
import { IApiNotification, INotificationModel, NotificationSchema } from 'models/NotificationModel';
import { ConnectionSchema, IApiConnection } from 'models/ConnectionModel';
import {
  IApiWalletSettings,
  IWalletSettingsSubdocument,
  WalletSettingsSchema,
} from 'models/WalletSettingsModel';

const Schema = mongoose.Schema;

export const WalletSchema = new Schema<IWalletModel>(
  {
    name: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    connections: [ConnectionSchema],
    strategy: RebalanceStrategySchema,
    shares: [WalletShareSchema],
    settings: WalletSettingsSchema,
    notifications: [NotificationSchema],
  },
  { timestamps: true }
);

export interface IWalletModel extends IEntityAttributes, IWalletAttributes, ITimestampAttributes {}

export interface IWalletAttributes {
  name: string;
  currency: string;
  /** MVP - only one connection */
  connections: Types.DocumentArray<INotificationModel>[];
  /**
   * wallet strategy
   */
  strategy: IRebalanceStrategySubdocument;
  shares: Types.DocumentArray<IWalletShareModel>;
  /**
   * probably xtb should give access to this
   */
  // deposits: IWalletDepositAttributes[];
  settings: IWalletSettingsSubdocument;
  notifications: Types.DocumentArray<INotificationModel>[];
}

export interface IApiWallet extends IApiNodeAttributes {
  name: string;
  currency: string;
  connections: IApiConnection[];
  strategy: IApiRebalanceStrategy;
  shares: IApiWalletShare[];
  settings: IApiWalletSettings;
  notifications: IApiNotification[];
}

export type IWalletDocument = Document<unknown, any, IWalletModel> & IWalletModel;
// &
// Required<{
//   _id: ObjectId;
// }>;

const WalletModel = mongoose.model<IWalletAttributes>('Wallet', WalletSchema);

export default WalletModel;
