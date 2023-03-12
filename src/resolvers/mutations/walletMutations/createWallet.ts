import { MutationResolvers } from 'generated/graphql';

export default <Pick<MutationResolvers, 'createWallet'>>{
  createWallet: async (_, args, { dataSources: { wallets } }) => {
    try {
      const newWallet = await wallets.createWallet(args);
      return {
        wallet: newWallet,
      };
    } catch (error: unknown) {
      throw error;
    }
  },
};
