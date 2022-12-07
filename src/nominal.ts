// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __brand: unique symbol
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __type: unique symbol

interface Brand<T, B extends string> {
  [__brand]: B
  [__type]: T
}

/**
 * `Nominal<T, B>` transforms `T` into a nominal type of `T`.
 *
 * See this official gist for more explanation on nominal typing:
 * [permalink](https://github.com/microsoft/TypeScript-Website/blob/da25328eb3ec6e1b2a0ff67b4f9595295f96a38c/packages/playground-examples/copy/en/TypeScript/Language%20Extensions/Nominal%20Typing.ts).
 * @example
 * ```ts
 * import { Nominal, nominal } from '@digitevent/type-lib'
 *
 * type MyString = Nominal<string, 'MyString'>
 * const newMyString = (v: string) => nominal<MyString>(v)
 * ```
 */
export type Nominal<T, B extends string> = T & Brand<T, B>

interface Flavoring<T, B> {
  [__brand]?: B
  // Remember the information about the internal type so it
  // can be inferred from the nominal type through Unbrand.
  [__type]?: T
}

// A Flavor type can be implicitly converted to its base type.
// See https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
// for inspiration.
type Flavor<T, B> = T & Flavoring<T, B>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Unbrand<T> = T extends Flavor<infer X, any> ? X : T

/**
 * Create a nominal type from a base type.
 * @example
 * ```ts
 * import { Nominal, nominal } from '@digitevent/type-lib'
 *
 * type MyString = Nominal<string, 'MyString'>
 * const newMyString = (v: string) => nominal<MyString>(v)
 * ```
 */
export const nominal = <T>(value: Unbrand<T>): T => value as T
