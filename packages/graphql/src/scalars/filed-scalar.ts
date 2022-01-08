import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

/**
 * Filter Custom Scalar
 * https://github.com/taion/graphql-type-json/blob/master/src/index.js 참고
 */
@Scalar('Filed')
export class FiledScalar implements CustomScalar<string, any> {
  description = 'Field https://dv-console.emmental.co.kr';

  parseValue(value: string): string {
    return FiledScalar.ensureObject(value);
  }

  serialize(value: string): string {
    return FiledScalar.ensureObject(value);
  }

  parseLiteral(ast: any) {
    return this.parseKind(ast);
  }

  private static ensureObject(value) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new TypeError(`Filter cannot represent non-object value: ${value}`);
    }
    return value;
  }

  private parseKind(ast) {
    switch (ast.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return parseFloat(ast.value);
      case Kind.NULL:
        return null;
      default:
        throw new Error(`Unexpected kind in parseLiteral: ${ast.kind}`);
    }
  }
}
