export type Comparator<T> = (a: T, b: T) => number;
export type BinarySearchResult = [found: boolean, finalIndex: number];

const defaultComparator: Comparator<number> = (a: number, b: number) => a - b;

/**
 * Returns the integer midpoint between two integers.
 * This should work for integers greater than 2^31, which wouldn't work if
 * using `a + b >>> 1`.
 */
const middle = (a: number, b: number): number => a + ((b - a) >>> 1);

export function binarySearch<T>(
  array: T[],
  item: T,
  comparatorFn: Comparator<T | number> = defaultComparator
): BinarySearchResult {
  let lowIndex = 0;
  let highIndex = array.length - 1;

  while (lowIndex <= highIndex) {
    const middleIndex = middle(lowIndex, highIndex);
    const comparatorResult = comparatorFn(array[middleIndex], item);

    // The value was too low; search the upper half
    if (comparatorResult < 0) lowIndex = middleIndex + 1;
    // The value was too high; search the lower half
    else if (comparatorResult > 0) highIndex = middleIndex - 1;
    // Found an exact match
    else return [true, middleIndex];
  }

  // Element was not found; return negative representation of where to insert
  return [false, lowIndex];
}

export function indexOf<T>(
  array: T[],
  item: T,
  comparatorFn: Comparator<T | number> = defaultComparator
): number {
  const [found, index] = binarySearch(array, item, comparatorFn);
  return found ? index : -1;
}

export function includes<T>(
  array: T[],
  item: T,
  comparatorFn: Comparator<T | number> = defaultComparator
): boolean {
  const [found] = binarySearch(array, item, comparatorFn);
  return found;
}

export function insert<T>(
  array: T[],
  item: T,
  comparatorFn?: Comparator<T | number>
): T[] {
  const [, index] = binarySearch(array, item, comparatorFn);

  // Add the item to the array
  array.splice(index, 0, item);

  return array;
}

export function remove<T>(
  array: T[],
  item: T,
  comparatorFn?: Comparator<T | number>
): T[] {
  const [found, index] = binarySearch(array, item, comparatorFn);

  if (!found) return array;

  // Add the item to the array
  array.splice(index, 1);

  return array;
}
