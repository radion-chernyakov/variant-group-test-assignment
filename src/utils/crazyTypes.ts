export type SplitTypedString<S extends string, D extends string> =
  string extends S ? string[] :
  S extends '' ? [] :
  S extends `${infer T}${D}${infer U}` ? [T, ...SplitTypedString<U, D>] : [S];

export type ToNumber<T extends string, R extends unknown[] = []> =
  T extends `${R['length']}` ? R['length'] : ToNumber<T, [1, ...R]>;
