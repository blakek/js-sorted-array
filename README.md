# @blakek/sorted-array

> 🔢 more efficient array functions for sorted arrays (e.g. binary search)

If you enjoy JavaScript, you probably like the [Array functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). This just some more efficient helpers if the array is guaranteed to be sorted.

## Install

Using [Yarn]:

```bash
$ yarn add @blakek/sorted-array
```

…or using [npm]:

```bash
$ npm i --save @blakek/sorted-array
```

## API

```js
import {
  binarySearch,
  indexOf,
  includes,
  insert,
  remove
} from '@blakek/sorted-array';
```

## API

### `binarySearch`

```ts
function binarySearch<T>(
  array: T[],
  item: T,
  comparatorFn?: Comparator<T | number>
): BinarySearchResult;
```

This is used to implement most of the other functionality.

- `array` - an array of any type to search
- `item` - the item to value to search for
- `comparatorFn` - a function that indicates which value is greater or if two values are equal. It's a similar to [Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

It returns a `BinarySearchResult`, which is a tuple:

```ts
type BinarySearchResult = [found: boolean, finalIndex: number];
```

- `found` - if the value was found (the `comparatorFn` returned `0` for two values)
- `finalIndex` - If found, is the index of the found value. If not, this is the index where the item would be inserted.

### `type Comparator`

```ts
type Comparator<T> = (a: T, b: T) => number;
```

This is not exported, but is the type for the `comparatorFn` argument used.

### `indexOf`

```ts
function indexOf<T>(
  array: T[],
  item: T,
  comparatorFn?: Comparator<T | number>
): number;
```

Returns the index of a matching value.

Example:

```js
import { indexOf } from '@blakek/sorted-array';

indexOf([1, 5, 7, 9, 10], 1); //» 0
indexOf([1, 5, 7, 9, 10], 9); //» 3
indexOf([1, 5, 7, 9, 10], 2); //» -1

// Custom comparator function
indexOf(
  [{ value: 1 }, { value: 3 }],
  { value: 3 },
  (a, b) => a.value - b.value
); //» 1
```

### `includes`

```ts
function includes<T>(
  array: T[],
  item: T,
  comparatorFn?: Comparator<T | number>
): boolean;
```

Returns if an array includes a matching value.

Example:

```js
import { includes } from '@blakek/sorted-array';

includes([1, 5, 7, 9, 10], 1); //» true
includes([1, 5, 7, 9, 10], 9); //» true
includes([1, 5, 7, 9, 10], 2); //» false

// Custom comparator function
includes(
  [{ value: 1 }, { value: 3 }],
  { value: 3 },
  (a, b) => a.value - b.value
); //» true
```

### `insert`

```ts
function insert<T>(
  array: T[],
  item: T,
  comparatorFn?: Comparator<T | number>
): T[];
```

Adds an element to the sorted array. Note, this mutates the array.

Example:

```js
import { insert } from '@blakek/sorted-array';

const array = [];
insert(array, 3); //» [ 3 ]
insert(array, 10); //» [ 3, 10 ]
insert(array, 1); //» [ 1, 3, 10 ]

// Custom comparator function
function comparator(a, b) {
  if (a.username > b.username) return 1;
  if (a.username < b.username) return -1;
  return a.lastSeen - b.lastSeen;
}

const seenTimes = [{ username: 'blakek', lastSeen: 1607658574048 }];

insert(seenTimes, { username: 'adash', lastSeen: 1607658574000 }, comparator);
//» [
//»   { username: 'adash', lastSeen: 1607658574000 },
//»   { username: 'blakek', lastSeen: 1607658574048 }
//» ]
```

### `remove`

```ts
function remove<T>(
  array: T[],
  item: T,
  comparatorFn?: Comparator<T | number>
): T[];
```

Removes an element to the sorted array. Note, this mutates the array.

Example:

```js
import { remove } from '@blakek/sorted-array';

const array = [1, 3, 10];
remove(array, 3); //» [ 1, 10 ]
remove(array, 10); //» [ 1 ]
remove(array, 1); //» []

// Custom comparator function
function comparator(a, b) {
  if (a.username > b.username) return 1;
  if (a.username < b.username) return -1;
  return a.lastSeen - b.lastSeen;
}

const seenTimes = [
  { username: 'adash', lastSeen: 1607658574000 },
  { username: 'blakek', lastSeen: 1607658574048 }
];

remove(seenTimes, { username: 'adash' }, comparator);
//» [ { username: 'blakek', lastSeen: 1607658574048 } ]
```

## Contributing

[Node.js] and [Yarn] are required to work with this project.

To install all dependencies, run:

```bash
yarn
```

### Useful Commands

|                     |                                                 |
| ------------------- | ----------------------------------------------- |
| `yarn build`        | Builds the project to `./dist`                  |
| `yarn format`       | Format the source following the Prettier styles |
| `yarn test`         | Run project tests                               |
| `yarn test --watch` | Run project tests, watching for file changes    |

## License

MIT

[node.js]: https://nodejs.org/
[npm]: https://npmjs.com/
[yarn]: https://yarnpkg.com/en/docs/
