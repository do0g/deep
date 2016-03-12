import { curry,
         fromPairs,
         map,
         adjust,
         toPairs,
         is,
         append,
         concat,
         keys,
         init,
         last,
         values,
         head,
         reduce,
         defaultTo } from 'ramda';

function nodeDeep(obj, callback, path = []) {
  if (is(Object, obj) && !is(Date, obj) && !is(RegExp, obj) && !is(Function, obj)) {
    return fromPairs(map(curry(iteratee)(callback, path), toPairs(obj)));
  }
  return obj;
}

function iteratee(callback, path, value) {
  const p = concat(path, head(value));
  const l = last(value);
  if (!defaultTo(false, callback(p, l))) {
    const res = nodeDeep(l, callback, p);
    return [head(value), res];
  }
}

export default nodeDeep;
