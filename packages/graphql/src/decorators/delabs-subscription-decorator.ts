import { Subscription as nestSubscriptionDecorator } from '@nestjs/graphql';
import { ReturnTypeFunc } from '@nestjs/graphql';
import { DocumentBuilder } from '../builders';
import { DelabsSubscriptionOptions } from '../interfaces';
import { authDecorator } from './auth-decorator';

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

    /** 인증 가드 설정 */
    if (options.auth && options.auth.isLogin) {
      authDecorator(type, options, target, key, descriptor);
    }

    /** nest/graphql @Subscription 데코레이터에 추가 */
    nestSubscriptionDecorator(nameOrType, options)(target, key, descriptor);
  };
}
