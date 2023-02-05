import WalletModel from '../models/WalletModel';
import Wallets from './Wallets';

export interface IDataSources {
  wallets: Wallets;
}

export default <IDataSources>{
  /**
   * there is some error with typing in MongoDataSource
   * where we can pass collection or model and typescript throws error when we pass model class
   */
  //@ts-ignore
  wallets: new Wallets(WalletModel),
};
