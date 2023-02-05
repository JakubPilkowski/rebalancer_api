import { QueryResolvers } from 'generated/graphql';

export default <Pick<QueryResolvers, 'wallet'>>{
  wallet: async (_, args, { dataSources: { wallets } }) => {
    try {
      return await wallets.getWallet(args);
    } catch (error: unknown) {
      throw error;
    }
  },
};
