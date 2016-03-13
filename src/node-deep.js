import { curry,
         fromPairs,
         toPairs,
         map,
         is,
         append,
         last,
         head,
         reduce,
         not,
         mergeAll,
         binary } from 'ramda';

const isPlainObject = obj => is(Object, obj) && !is(Date, obj) && !is(RegExp, obj) && !is(Function, obj);

function _deep(callback, obj, path = []) {
  if (isPlainObject(obj)) {
    return mergeAll(map(iteratee(callback, path), toPairs(obj)));
  }
  return obj;
}

const iteratee = curry((callback, path, pair) => {
  const newPath = append(head(pair), path);
  const obj     = last(pair);
  const res     = callback(newPath, obj);
  if (isPlainObject(res)) {
    return res;
  } else if (!res) {
    return { [head(pair)]: _deep(callback, obj, newPath) };
  }
});

const deep = binary(_deep);

export default deep;
