import { MutationResolvers } from 'generated/graphql';

export default <Pick<MutationResolvers, 'createWallet'>>{
  createWallet: async (_, args, { dataSources: { wallets } }) => {
    try {
      return await wallets.createWallet(args);
    } catch (error: unknown) {
      throw error;
    }
  },
};
