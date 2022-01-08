import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

/**
 * Filter Custom Scalar
 * https://github.com/taion/graphql-type-json/blob/master/src/index.js 참고
 */
@Scalar('Filter')
export class FilterScalar implements CustomScalar<string, any> {
  parseValue(value: string): string {
    return FilterScalar.ensureObject(value);
  }

  serialize(value: string): string {
    return FilterScalar.ensureObject(value);
  }

  parseLiteral(ast: any) {
    if (ast.kind !== Kind.OBJECT) {
      return undefined;
    }
    return this.parseObject(ast, ast.value);
  }

  private static ensureObject(value) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new TypeError(`Filter cannot represent non-object value: ${value}`);
    }
    return value;
  }

  private parseObject(ast, variables) {
    const value = {};
    ast.fields.forEach((field) => {
      // eslint-disable-next-line no-use-before-define
      value[field.name.value] = this.parseKind(field.value, variables);
    });
    return value;
  }

  private parseKind(ast: any, variables) {
    switch (ast.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return parseFloat(ast.value);
      case Kind.OBJECT:
        return this.parseObject(ast, variables);
      case Kind.LIST:
        return ast.values.map((n) => this.parseKind(n, variables));
      case Kind.NULL:
        return null;
      case Kind.VARIABLE: {
        const name = ast.name.value;
        return variables ? variables[name] : undefined;
      }
      default:
        return undefined;
    }
  }
}
