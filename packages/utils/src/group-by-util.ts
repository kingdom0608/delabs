const _groupBy = require('lodash.groupby');

export function groupBy(collection, iteratee) {
  return _groupBy(collection, iteratee);
}
