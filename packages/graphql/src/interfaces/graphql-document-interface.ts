import { DelabsGqlOptions } from './graphql-decorator-interface';

export interface GraphqlDocumentInterface {
  type: string;
  class: string;
  key: string;
  description: string;
  lastUpdate: string;
  contributors: string;
  cache: string;
}

export interface GraphqlDataInterface {
  target: any;
  key: string;
  options: DelabsGqlOptions;
}
