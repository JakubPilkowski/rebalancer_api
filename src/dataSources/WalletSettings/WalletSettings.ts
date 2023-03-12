import { Model } from 'mongoose';
import { MongoDataSource } from 'apollo-datasource-mongodb';

import { IWalletSettingsModel } from 'models/WalletSettingsModel';

export default class WalletSettingss extends MongoDataSource<IWalletSettingsModel> {
  //   public async getWalletSettings(): Promise<Wallet | null> {
  //     if (!this.model) {
  //       throw new Error('Wallets: undefined model object');
  //     }
  //     const model = this.model as Model<IWalletModel>;
  //     const connection = await model.findById(args.id);
  //     if (!connection) return null;
  //     return parseWalletSettings(connection);
  //   }
}
