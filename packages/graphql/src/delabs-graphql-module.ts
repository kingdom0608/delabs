import { Global, Module } from '@nestjs/common';
import { GraphQLModule, GqlModuleOptions } from '@nestjs/graphql';
import { DocumentBuilder } from './builders';
import { GraphqlGuard } from './guards';
import { ComplexityPlugin } from './plugins';
import { FilterScalar } from './scalars';
import { PageQueryOrderBy, PageQueryPagination } from './types';

const gqlModuleOptions: GqlModuleOptions = {
  fieldResolverEnhancers: ['interceptors'],
  context: ({ req, connection }) => {
    /** graphql 에게 request 를 요청할 때 req 안으로 jwt 할당 */
    if (req) {
      const user = req.headers.authorization;
      return { ...req, user };
    } else {
      return connection;
    }
  },
  installSubscriptionHandlers: true,
  autoSchemaFile: 'schema.gql',
  path: `/v1/graphql`,
  formatError: (error) => {
    if (error.message.startsWith('@IGNORE@')) {
      return undefined;
    }
    return error;
  }
};

@Global()
@Module({
  imports: [GraphQLModule.forRoot(gqlModuleOptions), GraphqlGuard],
  providers: [
    DocumentBuilder,
    ComplexityPlugin,
    FilterScalar,
    PageQueryPagination,
    PageQueryOrderBy
  ],
  exports: [DocumentBuilder],
  controllers: []
})
export class DelabsGraphqlModule {
  /**
   * GQL 문서 생성
   */
  public static createGqlDocument() {
    DocumentBuilder.build();
  }
}
