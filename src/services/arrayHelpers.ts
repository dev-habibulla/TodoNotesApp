export function addItem<T>(array: T[], item: T): T[] {
  return [...array, item];
}

export function removeItem<T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] {
  return array.filter((item) => !predicate(item));
}

export function updateItem<T>(
  array: T[],
  predicate: (item: T) => boolean,
  updater: (item: T) => T
): T[] {
  return array.map((item) => (predicate(item) ? updater(item) : item));
}

