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
         binary,
         keys,
         __,
         filter,
         isEmpty,
         curryN,
         compose } from 'ramda';

const isPlainObject = obj => is(Object, obj) && !is(Date, obj) && !is(RegExp, obj) && !is(Function, obj);

function deep(callback, obj, path) {
  if (is(Array, obj)) {
    return filter(compose(not, isEmpty), map(curry(deep)(callback, __, path), obj));
  }
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
    return { [head(pair)]: deep(callback, obj, newPath) };
  }
});

export default curryN(2, (callback, obj) => deep(callback, obj, []));
