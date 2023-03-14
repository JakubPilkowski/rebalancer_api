import { MutationResolvers } from 'generated/graphql';

export default <Pick<MutationResolvers, 'deleteWallet'>>{
  deleteWallet: async (_, args, { dataSources: { wallets } }) => {
    try {
      const wallet = await wallets.deleteWallet(args);
      return {
        walletId: wallet,
      };
    } catch (error: unknown) {
      throw error;
    }
  },
};
