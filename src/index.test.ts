import test from 'ava';
import { includes, indexOf, insert, remove } from '.';

test('finds index of items in an array', t => {
  const array = [
    2,
    3,
    5,
    7,
    11,
    13,
    17,
    19,
    23,
    29,
    31,
    37,
    41,
    43,
    47,
    53,
    59,
    61
  ];

  t.is(indexOf(array, 2), 0);
  t.is(indexOf(array, 61), 17);
  t.is(indexOf(array, 23), 8);
  t.is(indexOf(array, 1), -1);
  t.is(indexOf(array, 1000), -1);
  t.is(indexOf(array, 10), -1);
});

test('tests if an array includes a value', t => {
  t.is(includes([1, 2, 3, 61], 2), true);
  t.is(includes([1, 2, 3, 61], 61), true);
  t.is(includes([1, 2, 3, 61], 3), true);
  t.is(includes([1, 2, 3, 61], 4), false);
  t.is(includes([1, 2, 3, 61], 1000), false);
});

test('inserts items in an ordered array', t => {
  const array = [] as number[];
  t.deepEqual(insert(array, 50), [50]);
  t.deepEqual(insert(array, 25), [25, 50]);
  t.deepEqual(insert(array, 75), [25, 50, 75]);
  t.deepEqual(insert(array, 62.5), [25, 50, 62.5, 75]);
  t.deepEqual(insert(array, 50), [25, 50, 50, 62.5, 75]);
});

test('removes items from an ordered array', t => {
  const array = [25, 50, 50, 62.5, 75];
  t.deepEqual(remove(array, 50), [25, 50, 62.5, 75]);
  t.deepEqual(remove(array, 62.5), [25, 50, 75]);
  t.deepEqual(remove(array, 75), [25, 50]);
  t.deepEqual(remove(array, 25), [50]);
  t.deepEqual(remove(array, 50), []);
});
