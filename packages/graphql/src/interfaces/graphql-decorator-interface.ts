interface GqlDecoratorAuthPublicOptions {
  isLogin: false;
}

interface GqlDecoratorAuthPrivateOptions {
  isLogin: true;
  requireScope?: any; // RequireScopesInterface;
  /* 권한이 없어도 에러를 발생시키지 않아야 하는 경우 사용. 시작 path의 배열이나 true(모든 path) */
  ignorePathIfNotAllow?: string[] | true;
}

type GqlDecoratorAuthOptions =
  | GqlDecoratorAuthPublicOptions
  | GqlDecoratorAuthPrivateOptions
  | false;

interface DelabsQueryCacheOptions {
  key: string;
  ttl: number;
}

/**
 * DelabsGraphql 데코레이터 인터페이스
 */
interface BasicGqlDecoratorOptions {
  description: string;
  lastUpdate: string;
  contributors: Array<string>;
  deprecated?: string;
  nullable?: boolean | 'items' | 'itemsAndList';
  defaultValue?: any;
  auth?: GqlDecoratorAuthOptions;
  array?: boolean;
  name?: string;
}

interface GqlDecoratorWithCacheOptions extends BasicGqlDecoratorOptions {
  cache?: DelabsQueryCacheOptions;
}

interface GqlSubscriptionOptions extends BasicGqlDecoratorOptions {
  filter?: (payload: any, variables: any, context: any) => boolean | Promise<boolean>;
  resolve?: (payload: any, args: any, context: any, info: any) => any | Promise<any>;
}

export type DelabsQueryOptions = GqlDecoratorWithCacheOptions;
export type DelabsPropertyResolverOptions = BasicGqlDecoratorOptions;
export type DelabsMutationOptions = BasicGqlDecoratorOptions;
export type DelabsSubscriptionOptions = GqlSubscriptionOptions;
export type DelabsGqlOptions =
  | DelabsQueryOptions
  | DelabsPropertyResolverOptions
  | DelabsMutationOptions;
export type DelabsGqlType = 'Query' | 'ResolveField' | 'Mutation' | 'Subscription';
