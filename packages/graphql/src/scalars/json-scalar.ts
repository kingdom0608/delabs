import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
// export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray
export declare type JsonValue = string | number | boolean | null | object;

@Scalar('JsonValue')
export class JsonScalar implements CustomScalar<string, JsonValue> {
  description = 'Json custom scalar type';

  parseValue(value: string): object {
    // console.log(value);
    return JSON.parse(value); // value from the client
  }

  serialize(value: object): string {
    // console.log(value);
    return JSON.stringify(value); // value sent to the client
  }

  parseLiteral(ast: any): object {
    // console.log(ast);
    if (ast.kind === Kind.OBJECT) {
      return JSON.parse(ast.value);
    }
    return null;
  }
}
