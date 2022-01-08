import { Injectable } from '@nestjs/common';
import { groupBy } from '@delabs/utils';
import { GraphqlDataInterface, GraphqlDocumentInterface } from '../interfaces';

@Injectable()
export class DocumentBuilder {
  static delabsGqlData: GraphqlDataInterface[] = [];
  static delabsGqlDocs: GraphqlDocumentInterface[] = [];

  static addData(data: any) {
    DocumentBuilder.delabsGqlData.push(data);
  }

  static build() {
    const groupByData = groupBy(this.delabsGqlData, 'type');
    const types = Object.keys(groupByData);
    types.forEach((type) => {
      groupByData[type].forEach((data: any) => {
        let {
          target,
          key,
          options: {
            description,
            deprecated,
            lastUpdate,
            contributors,
            cache = {
              key: '',
              ttl: ''
            }
          }
        } = data;
        if (deprecated) {
          description = `[DEPRECATED] ${description} (${deprecated})`;
        }
        this.delabsGqlDocs.push({
          type,
          class: target.constructor.name,
          key,
          description,
          lastUpdate,
          contributors: contributors.join(','),
          cache: cache.key ? `${cache.key}(${cache.ttl})` : '-'
        });
      });
    });
  }
}
