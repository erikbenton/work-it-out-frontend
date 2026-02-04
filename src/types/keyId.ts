export default interface KeyId {
  key?: string
}

export function populateKey<T extends KeyId>(obj: T): T {
  return { ...obj, key: crypto.randomUUID() }
}

export function mapKeys<T extends KeyId>(arr: T[]): T[] {
  return arr.map(populateKey);
}