import { Model } from 'mongoose';
import { MongoDataSource } from 'apollo-datasource-mongodb';

import { IRebalanceStrategyModel } from 'models/RebalanceStrategyModel';

export default class RebalanceStrategies extends MongoDataSource<IRebalanceStrategyModel> {
  //   public async getRebalanceStrategie(): Promise<Wallet | null> {
  //     if (!this.model) {
  //       throw new Error('Wallets: undefined model object');
  //     }
  //     const model = this.model as Model<IWalletModel>;
  //     const connection = await model.findById(args.id);
  //     if (!connection) return null;
  //     return parseRebalanceStrategie(connection);
  //   }
}
