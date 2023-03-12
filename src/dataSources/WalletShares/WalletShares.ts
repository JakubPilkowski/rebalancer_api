import { Model } from 'mongoose';
import { MongoDataSource } from 'apollo-datasource-mongodb';

import { IWalletShareModel } from 'models/WalletShareModel';

export default class WalletShares extends MongoDataSource<IWalletShareModel> {
  //   public async getShare(): Promise<Wallet | null> {
  //     if (!this.model) {
  //       throw new Error('Wallets: undefined model object');
  //     }
  //     const model = this.model as Model<IWalletModel>;
  //     const connection = await model.findById(args.id);
  //     if (!connection) return null;
  //     return parseShare(connection);
  //   }
}
