import { curry,
         fromPairs,
         map,
         adjust,
         toPairs,
         is,
         append,
         concat,
         keys } from 'ramda';

const mapValues = curry((fn, obj) => fromPairs(map(adjust(fn, 1), toPairs(obj))));

function nodeDeep(obj, callback, path = []) {
  if (is(Object, obj) && !is(Date, obj) && !is(RegExp, obj) && !is(Function, obj)) {
    console.log('blah');
    map(curry(iteratee)(callback), 
        map(concat(path), keys(obj)));
  }

}

function iteratee(callback, path) {
  callback(path);
}

export default nodeDeep;
