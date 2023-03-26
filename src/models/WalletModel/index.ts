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
import { ConnectionSchema, IApiConnection, IConnectionModel } from 'models/ConnectionModel';
import {
  IApiWalletSettings,
  IWalletSettingsSubdocument,
  WalletSettingsSchema,
} from 'models/WalletSettingsModel';
import {
  IApiRebalanceHistory,
  IRebalanceHistoryModel,
  RebalanceHistorySchema,
} from 'models/RebalanceHistoryModel';

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
    wageStatus: {
      type: String,
      required: true,
    },
    history: [RebalanceHistorySchema],
    shares: [WalletShareSchema],
    settings: WalletSettingsSchema,
    notifications: [NotificationSchema],
  },
  { timestamps: true }
);

export interface IWalletModel extends IEntityAttributes, IWalletAttributes, ITimestampAttributes {}

/**
 * UNSET - wages are not set
 * READY - wages are set
 */
export type IWalletWageStatus = 'UNSET' | 'READY';

export interface IWalletAttributes {
  name: string;
  currency: string;
  /** MVP - only one connection */
  connections: Types.DocumentArray<IConnectionModel>;
  /**
   * wallet strategy
   */
  strategy: IRebalanceStrategySubdocument;
  shares: Types.DocumentArray<IWalletShareModel>;
  wageStatus: IWalletWageStatus;
  history: Types.DocumentArray<IRebalanceHistoryModel>;
  startDate: NativeDate;
  /**
   * probably xtb should give access to this
   */
  // deposits: IWalletDepositAttributes[];
  settings: IWalletSettingsSubdocument;
  notifications: Types.DocumentArray<INotificationModel>;
}

export interface IApiWallet extends IApiNodeAttributes {
  name: string;
  currency: string;
  connections: IApiConnection[];
  strategy: IApiRebalanceStrategy;
  shares: IApiWalletShare[];
  history: IApiRebalanceHistory[];
  startDate: string;
  settings: IApiWalletSettings;
  wageStatus: IWalletWageStatus;
  notifications: IApiNotification[];
}

export type IWalletDocument = Document<unknown, any, IWalletModel> & IWalletModel;

const WalletModel = mongoose.model<IWalletAttributes>('Wallet', WalletSchema);

export default WalletModel;
