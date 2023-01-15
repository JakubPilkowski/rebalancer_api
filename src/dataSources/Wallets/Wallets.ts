import { Model } from 'mongoose';
import { MongoDataSource } from 'apollo-datasource-mongodb';

import { MutationCreateWalletArgs, QueryWalletArgs, Wallet } from 'generated/graphql';
import { IWalletModel } from 'models/WalletModel';
import parseWallet from './parseWallet';

export default class Wallets extends MongoDataSource<IWalletModel> {
  public async getWallets(): Promise<Wallet[]> {
    if (!this.model) {
      throw new Error('Wallets: undefined model object');
    }
    const model = this.model as Model<IWalletModel>;
    const wallets = await model.find();
    return wallets.map<Wallet>((wallet) => parseWallet(wallet));
  }

  public async getWallet(args: QueryWalletArgs): Promise<Wallet | null> {
    if (!this.model) {
      throw new Error('Wallets: undefined model object');
    }
    const model = this.model as Model<IWalletModel>;
    const wallet = await model.findById(args.id);
    if (!wallet) return null;

    return parseWallet(wallet);
  }

  public async createWallet(args: MutationCreateWalletArgs): Promise<Wallet> {
    if (!this.model) {
      throw new Error('Wallets: undefined model object');
    }
    const model = this.model as Model<IWalletModel>;

    const newWallet = new model(args.input);
    console.log('Wallets: create wallet instance');

    await newWallet.save();
    console.log('Wallets: save wallet');

    return parseWallet(newWallet);
  }
}
