import { Subscription as nestSubscriptionDecorator } from '@nestjs/graphql';
import { ReturnTypeFunc } from '@nestjs/graphql';
import { DocumentBuilder } from '../builders';
import { DelabsSubscriptionOptions } from '../interfaces';

/**
 * DelabsSubscription 데코레이터
 * @param nameOrType
 * @param options
 * @constructor
 */
export function DelabsSubscription(
  nameOrType: ReturnTypeFunc,
  options: DelabsSubscriptionOptions
): MethodDecorator {
  if (options.nullable === undefined) {
    options.nullable = true;
  }
  return (target, key?: string, descriptor?: any) => {
    const type = 'Subscription';

    /** GraphQl 문서 생성을 위한 데이터 추가 */
    DocumentBuilder.addData({
      type,
      key,
      options,
      target
    });
    Reflect.defineMetadata('delabsGql', options, target);

    /** nest/graphql @Subscription 데코레이터에 추가 */
    nestSubscriptionDecorator(nameOrType, options)(target, key, descriptor);
  };
}
