import { Model } from 'mongoose';
import { MongoDataSource } from 'apollo-datasource-mongodb';

import { IPeriodModel } from 'models/PeriodModel';

export default class Periods extends MongoDataSource<IPeriodModel> {
  //   public async getPeriod(): Promise<Wallet | null> {
  //     if (!this.model) {
  //       throw new Error('Wallets: undefined model object');
  //     }
  //     const model = this.model as Model<IWalletModel>;
  //     const connection = await model.findById(args.id);
  //     if (!connection) return null;
  //     return parsePeriod(connection);
  //   }
}
