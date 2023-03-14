import { Model } from 'mongoose';
import { MongoDataSource } from 'apollo-datasource-mongodb';

import {
  MutationCreateWalletArgs,
  MutationDeleteWalletArgs,
  QueryWalletArgs,
  Wallet,
} from 'generated/graphql';

import { IWalletModel } from 'models/WalletModel';

import parseWallet from './parseWallet';
import createWallet from './createWallet';

export default class Wallets extends MongoDataSource<IWalletModel> {
  private getModel(): Model<IWalletModel> {
    if (!this.model) {
      throw new Error('Wallets: undefined model object');
    }
    return this.model as Model<IWalletModel>;
  }

  public async getWallets(): Promise<Wallet[]> {
    const model = this.getModel();
    const wallets = await model.find();
    const results = Promise.all(
      wallets.map<Promise<Wallet>>(async (wallet) => {
        const result = await parseWallet(wallet);
        return result;
      })
    );
    return results;
  }

  public async getWallet(args: QueryWalletArgs): Promise<Wallet | null> {
    const model = this.getModel();
    const wallet = await model.findById(args.id);
    if (!wallet) return null;

    return parseWallet(wallet);
  }

  public async createWallet(args: MutationCreateWalletArgs): Promise<Wallet> {
    const model = this.getModel();

    const newWallet = createWallet(model, args);

    console.log('Wallets: create wallet instance');

    console.log(`Wallets: id ${newWallet._id}`);

    await newWallet.save();
    console.log('Wallets: save wallet');

    return parseWallet(newWallet);
  }

  public async deleteWallet({ input: { walletId } }: MutationDeleteWalletArgs): Promise<string> {
    const model = this.getModel();

    const wallet = await model.findById(walletId);
    if (!wallet)
      throw new Error(
        `Wallets: Cannot delete wallet with id: ${walletId}. Wallet with given id does not exist`
      );

    const id = wallet.id;

    await wallet.delete();

    console.log(`Wallets: delete wallet id:${id}`);

    return id;
  }
}
