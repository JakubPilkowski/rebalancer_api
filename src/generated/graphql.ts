import { GraphQLResolveInfo } from 'graphql';
import { ApolloContextValue } from '../config/createApolloServer';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Connection = {
  __typename?: 'Connection';
  broker: ConnectionBroker;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export enum ConnectionBroker {
  Xtb = 'XTB'
}

export type CreateWalletInput = {
  broker: Scalars['String'];
  currency: Scalars['String'];
  name: Scalars['String'];
  notifications: Array<InputMaybe<Scalars['Int']>>;
  periodDeposit: Scalars['Float'];
  periodUnit: PeriodUnit;
  periodValue: Scalars['Int'];
};

export type CreateWalletPayload = {
  __typename?: 'CreateWalletPayload';
  wallet: Wallet;
};

export type CreateWalletShareInput = {
  ticker: Scalars['String'];
  wage: Scalars['Float'];
};

export type DeleteWalletInput = {
  walletId: Scalars['ID'];
};

export type DeleteWalletPayload = {
  __typename?: 'DeleteWalletPayload';
  walletId: Scalars['ID'];
};

export type Deposit = {
  __typename?: 'Deposit';
  createdAt: Scalars['String'];
  currency: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  value: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createWallet?: Maybe<CreateWalletPayload>;
  deleteWallet?: Maybe<DeleteWalletPayload>;
};


export type MutationCreateWalletArgs = {
  input: CreateWalletInput;
};


export type MutationDeleteWalletArgs = {
  input: DeleteWalletInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['String'];
  daysBeforeNotify: Array<Maybe<Scalars['Int']>>;
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export type Period = {
  __typename?: 'Period';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  unit: PeriodUnit;
  updatedAt: Scalars['String'];
  value: Scalars['Int'];
};

export enum PeriodUnit {
  Month = 'MONTH',
  Year = 'YEAR'
}

export type Query = {
  __typename?: 'Query';
  wallet: Wallet;
  wallets?: Maybe<Array<Wallet>>;
};


export type QueryWalletArgs = {
  id: Scalars['String'];
};

export type RebalanceStrategy = {
  __typename?: 'RebalanceStrategy';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  period: Period;
  periodDeposit: Deposit;
  updatedAt: Scalars['String'];
};

export type Share = {
  __typename?: 'Share';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isIncluded: Scalars['Boolean'];
  ticker: Scalars['String'];
  updatedAt: Scalars['String'];
  wage: Scalars['Float'];
};

export type Wallet = {
  __typename?: 'Wallet';
  connections: Array<Maybe<Connection>>;
  createdAt: Scalars['String'];
  currency: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  notifications: Array<Maybe<Notification>>;
  settings: WalletSettings;
  shares: Array<Maybe<Share>>;
  strategy: RebalanceStrategy;
  updatedAt: Scalars['String'];
  wageStatus: WalletWageStatus;
};

export type WalletSettings = {
  __typename?: 'WalletSettings';
  createdAt: Scalars['String'];
  hasNotificationsSilenced: Scalars['Boolean'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export enum WalletWageStatus {
  Ready = 'READY',
  Unset = 'UNSET'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Connection: ResolverTypeWrapper<Connection>;
  ConnectionBroker: ConnectionBroker;
  CreateWalletInput: CreateWalletInput;
  CreateWalletPayload: ResolverTypeWrapper<CreateWalletPayload>;
  CreateWalletShareInput: CreateWalletShareInput;
  DeleteWalletInput: DeleteWalletInput;
  DeleteWalletPayload: ResolverTypeWrapper<DeleteWalletPayload>;
  Deposit: ResolverTypeWrapper<Deposit>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Notification: ResolverTypeWrapper<Notification>;
  Period: ResolverTypeWrapper<Period>;
  PeriodUnit: PeriodUnit;
  Query: ResolverTypeWrapper<{}>;
  RebalanceStrategy: ResolverTypeWrapper<RebalanceStrategy>;
  Share: ResolverTypeWrapper<Share>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Wallet: ResolverTypeWrapper<Wallet>;
  WalletSettings: ResolverTypeWrapper<WalletSettings>;
  WalletWageStatus: WalletWageStatus;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Connection: Connection;
  CreateWalletInput: CreateWalletInput;
  CreateWalletPayload: CreateWalletPayload;
  CreateWalletShareInput: CreateWalletShareInput;
  DeleteWalletInput: DeleteWalletInput;
  DeleteWalletPayload: DeleteWalletPayload;
  Deposit: Deposit;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Notification: Notification;
  Period: Period;
  Query: {};
  RebalanceStrategy: RebalanceStrategy;
  Share: Share;
  String: Scalars['String'];
  Wallet: Wallet;
  WalletSettings: WalletSettings;
};

export type ConnectionResolvers<ContextType = ApolloContextValue, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = {
  broker?: Resolver<ResolversTypes['ConnectionBroker'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateWalletPayloadResolvers<ContextType = ApolloContextValue, ParentType extends ResolversParentTypes['CreateWalletPayload'] = ResolversParentTypes['CreateWalletPayload']> = {
  wallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteWalletPayloadResolvers<ContextType = ApolloContextValue, ParentType extends ResolversParentTypes['DeleteWalletPayload'] = ResolversParentTypes['DeleteWalletPayload']> = {
  walletId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DepositResolvers<ContextType = ApolloContextValue, ParentType extends ResolversParentTypes['Deposit'] = ResolversParentTypes['Deposit']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApolloContextValue, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createWallet?: Resolver<Maybe<ResolversTypes['CreateWalletPayload']>, ParentType, ContextType, RequireFields<MutationCreateWalletArgs, 'input'>>;
  deleteWallet?: Resolver<Maybe<ResolversTypes['DeleteWalletPayload']>, ParentType, ContextType, RequireFields<MutationDeleteWalletArgs, 'input'>>;
};

export type NotificationResolvers<ContextType = ApolloContextValue, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  daysBeforeNotify?: Resolver<Array<Maybe<ResolversTypes['Int']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PeriodResolvers<ContextType = ApolloContextValue, ParentType extends ResolversParentTypes['Period'] = ResolversParentTypes['Period']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['PeriodUnit'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ApolloContextValue, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  wallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType, RequireFields<QueryWalletArgs, 'id'>>;
  wallets?: Resolver<Maybe<Array<ResolversTypes['Wallet']>>, ParentType, ContextType>;
};

export type RebalanceStrategyResolvers<ContextType = ApolloContextValue, ParentType extends ResolversParentTypes['RebalanceStrategy'] = ResolversParentTypes['RebalanceStrategy']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  period?: Resolver<ResolversTypes['Period'], ParentType, ContextType>;
  periodDeposit?: Resolver<ResolversTypes['Deposit'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShareResolvers<ContextType = ApolloContextValue, ParentType extends ResolversParentTypes['Share'] = ResolversParentTypes['Share']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isIncluded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ticker?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletResolvers<ContextType = ApolloContextValue, ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet']> = {
  connections?: Resolver<Array<Maybe<ResolversTypes['Connection']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notifications?: Resolver<Array<Maybe<ResolversTypes['Notification']>>, ParentType, ContextType>;
  settings?: Resolver<ResolversTypes['WalletSettings'], ParentType, ContextType>;
  shares?: Resolver<Array<Maybe<ResolversTypes['Share']>>, ParentType, ContextType>;
  strategy?: Resolver<ResolversTypes['RebalanceStrategy'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wageStatus?: Resolver<ResolversTypes['WalletWageStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletSettingsResolvers<ContextType = ApolloContextValue, ParentType extends ResolversParentTypes['WalletSettings'] = ResolversParentTypes['WalletSettings']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasNotificationsSilenced?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloContextValue> = {
  Connection?: ConnectionResolvers<ContextType>;
  CreateWalletPayload?: CreateWalletPayloadResolvers<ContextType>;
  DeleteWalletPayload?: DeleteWalletPayloadResolvers<ContextType>;
  Deposit?: DepositResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  Period?: PeriodResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RebalanceStrategy?: RebalanceStrategyResolvers<ContextType>;
  Share?: ShareResolvers<ContextType>;
  Wallet?: WalletResolvers<ContextType>;
  WalletSettings?: WalletSettingsResolvers<ContextType>;
};

