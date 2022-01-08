import { GraphQLSchemaHost, Plugin } from '@nestjs/graphql';
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { GraphQLError } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator
} from 'graphql-query-complexity';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  requestDidStart(): GraphQLRequestListener {
    const { schema } = this.gqlSchemaHost;

    return {
      didResolveOperation({ request, document }) {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 })
          ]
        });
        // TODO(@jade): complexity 값을 임의로 50 으로 설정 논의 후 확정 필  date: 2022/01/03 3:38 PM
        if (complexity >= 50) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: 50`
          );
        }
        console.log('Query Complexity:', complexity);
      }
    };
  }
}
