import { Mutation as nestMutationDecorator } from '@nestjs/graphql';
import { ReturnTypeFunc } from '@nestjs/graphql';
import { DocumentBuilder } from '../builders';
import { DelabsGqlType, DelabsMutationOptions } from '../interfaces';
/**
 * DelabsMutation 데코레이터
 * @param nameOrType
 * @param options
 * @constructor
 */
export function DelabsMutation(
  nameOrType: ReturnTypeFunc,
  options: DelabsMutationOptions
): MethodDecorator {
  if (options.nullable === undefined) {
    options.nullable = true;
  }

  return (target, key?: string, descriptor?: any) => {
    const type: DelabsGqlType = 'Mutation';
    const eventType = 'GRAPHQL:MUTATION';

    /** GraphQl 문서 생성을 위한 데이터 추가 */
    DocumentBuilder.addData({
      type,
      key,
      options,
      target
    });
    Reflect.defineMetadata('delabsGql', options, target);

    /** nest/graphql @Mutation 데코레이터에 추가 */
    nestMutationDecorator(nameOrType, options)(target, key, descriptor);
  };
}
