import { Model } from 'mongoose';
import { MongoDataSource } from 'apollo-datasource-mongodb';

import { IDepositModel } from 'models/DepositModel';

export default class Deposits extends MongoDataSource<IDepositModel> {
  //   public async getDeposit(): Promise<Wallet | null> {
  //     if (!this.model) {
  //       throw new Error('Wallets: undefined model object');
  //     }
  //     const model = this.model as Model<IWalletModel>;
  //     const connection = await model.findById(args.id);
  //     if (!connection) return null;
  //     return parseDeposit(connection);
  //   }
}
