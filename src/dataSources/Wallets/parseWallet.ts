import { Wallet } from 'generated/graphql';
import { IWalletDocument } from 'models/WalletModel';

export default function parseWallet(wallet: IWalletDocument): Wallet {
  return {
    _id: wallet.id,
    name: wallet.name,
    currency: wallet.currency,
    createdAt: new Date(wallet.createdAt).toISOString(),
  };
}
