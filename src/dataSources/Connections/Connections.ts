import { Model } from 'mongoose';
import { MongoDataSource } from 'apollo-datasource-mongodb';

import { IConnectionModel } from 'models/ConnectionModel';

export default class Connections extends MongoDataSource<IConnectionModel> {
  //   public async getConnection(): Promise<Wallet | null> {
  //     if (!this.model) {
  //       throw new Error('Wallets: undefined model object');
  //     }
  //     const model = this.model as Model<IWalletModel>;
  //     const connection = await model.findById(args.id);
  //     if (!connection) return null;
  //     return parseConnection(connection);
  //   }
}
