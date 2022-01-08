import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('Where')
export class WhereScalar implements CustomScalar<string, string> {
  description = 'Where 자동 생성';

  parseValue(value: string): string {
    return value;
    // switch (value[0]) {
    //   case '%&':
    //     return ['like', value.slice(1, value.length)];
    //   case '!!':
    //     return ['not', value.slice(1, value.length)];
    //   case '**':
    //     return ['in', value.slice(1, value.length)];
    //   case '^-':
    //     return ['starts', value.slice(1, value.length)];
    //   case '>':
    //     return ['eq', value.slice(1, value.length)];
    //   case '<':
    //     return ['eq', value.slice(1, value.length)];
    //   default:
    //     return [value]
    // }
  }

  serialize(value: string): string {
    return value;
    // switch (value[0]) {
    //   case '%&':
    //     return ['like', value.slice(1, value.length)];
    //   case '!!':
    //     return ['not', value.slice(1, value.length)];
    //   case '**':
    //     return ['in', value.slice(1, value.length)];
    //   case '^-':
    //     return ['starts', value.slice(1, value.length)];
    //   case '>':
    //     return ['eq', value.slice(1, value.length)];
    //   case '<':
    //     return ['eq', value.slice(1, value.length)];
    //   default:
    //     return [value]
    // }
  }

  parseLiteral(ast: any): string {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  }
}
