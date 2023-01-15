import { QueryResolvers } from 'generated/graphql';

export default <Pick<QueryResolvers, 'wallets'>>{
  wallets: async (_, __, { dataSources: { wallets } }) => {
    try {
      return await wallets.getWallets();
    } catch (error: unknown) {
      throw error;
    }
  },
};
