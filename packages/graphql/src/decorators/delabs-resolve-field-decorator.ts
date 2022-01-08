import { ResolveField as nestResolvePropertyDecorator } from '@nestjs/graphql';
import { ReturnTypeFunc } from '@nestjs/graphql';
import { DocumentBuilder } from '../builders';
import { DelabsGqlType, DelabsPropertyResolverOptions } from '../interfaces';

/**
 * DelabsResolveField 데코레이터
 * @param nameOrType
 * @param options
 * @constructor
 */
export function DelabsResolveField(
  nameOrType: ReturnTypeFunc,
  options: DelabsPropertyResolverOptions
): MethodDecorator {
  if (options.nullable === undefined) {
    options.nullable = true;
  }
  return (target, key?: string, descriptor?: any) => {
    const type: DelabsGqlType = 'ResolveField';

    /** GraphQl 문서 생성을 위한 데이터 추가 */
    DocumentBuilder.addData({
      type,
      key,
      options,
      target
    });
    Reflect.defineMetadata('delabsGql', options, target);

    /** nest/graphql @ResolveField 데코레이터에 추가 */
    nestResolvePropertyDecorator(nameOrType, options)(target, key, descriptor);
  };
}
