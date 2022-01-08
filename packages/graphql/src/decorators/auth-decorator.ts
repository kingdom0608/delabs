import { UseGuards } from '@nestjs/common';
import { DelabsGqlOptions, DelabsGqlType } from '../interfaces';
import { GraphqlGuard } from '../guards';

/**
 * 인증 헬퍼 함수
 * @param type
 * @param options
 * @param target
 * @param key
 * @param descriptor
 * @return boolean
 */
export function authDecorator(
  type: DelabsGqlType,
  options: DelabsGqlOptions,
  target,
  key,
  descriptor
) {
  /** 로그인 여부만 확인 - JWT 토큰 확인 */
  UseGuards(GraphqlGuard)(target, key, descriptor);

  return true;
}
