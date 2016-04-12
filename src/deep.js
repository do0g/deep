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
         complement,
         isNil,
         compose } from 'ramda';

const isPlainObject = obj => is(Object, obj) && !is(Date, obj) && !is(RegExp, obj) && !is(Function, obj);

const deep = curry((callback, root, rootPath) => {
  console.log(JSON.stringify(root));
//  let stack = [], next;
//  stack.push([rootPath, toPairs(root)]);
//  while (next = stack.pop()) {
//    console.log(next);
//    const [ basePath, pairs ] = next;
//    map(pair => {
//      const key   = head(pair);
//      const value = last(pair);
//      const path  = append(key, basePath);
//      if (isPlainObject(value)) {
//        stack.push([path, toPairs(value)]);
//      }
//    }, pairs);
//  }

  let stack = [], index = 0, length = 0;
  toPairs(root).forEach(p => {
    stack.push([rootPath, p]);
    length++;
  });
  for (let index = 0; index < length; index++) {
    const next = stack[index];
    console.log(next);
    const [ basePath, pair ] = next;
    const key   = head(pair);
    const value = last(pair);
    const path  = append(key, basePath);
    if (isPlainObject(value)) {
      toPairs(value).forEach(p => {
        stack.push([path, p]);
        length++;
      });
    }
  }
//  let stack = [], index = 0, length = 1;
//  stack.push([rootPath, toPairs(root)]);
//  for (let index = 0; index < length; index++) {
//    const next = stack[index];
//    console.log(next);
//    const [ basePath, pairs ] = next;
//    map(pair => {
//      const key   = head(pair);
//      const value = last(pair);
//      const path  = append(key, basePath);
//      if (isPlainObject(value)) {
//        const pairs = toPairs(value);
//        length += pairs.length;
//        stack.push([path, pairs]);
//      }
//    }, pairs);
//  }

//  if (is(Array, obj)) {
//    return filter(compose(not, isEmpty), map(deep(callback, __, path), obj));
//  }
//  if (isPlainObject(obj)) {
//    return mergeAll(filter(complement(isNil), map(iteratee(callback, path), toPairs(obj))));
//  }
//  return obj;
});

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
