import { Model } from 'mongoose';
import { MongoDataSource } from 'apollo-datasource-mongodb';

import { INotificationModel } from 'models/NotificationModel';

export default class Notifications extends MongoDataSource<INotificationModel> {
  //   public async getNotification(): Promise<Wallet | null> {
  //     if (!this.model) {
  //       throw new Error('Wallets: undefined model object');
  //     }
  //     const model = this.model as Model<IWalletModel>;
  //     const connection = await model.findById(args.id);
  //     if (!connection) return null;
  //     return parseNotification(connection);
  //   }
}
