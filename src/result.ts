export const ResultType = {
  Ok: Symbol(':ok'),
  Err: Symbol(':err'),
}

/**
 * `Result<T, E>` is the type used for returning and propagating errors
 *  when errors are expected as natural part of the flow and recoverable.
 *
 * The variants are `OK(T)` representing success and containing a value,
 * and `Err(E)`, representing error and containing an error value.
 * @see {@link Ok} and {@link Err} concrete types.
 * @example
 * ```
 * function tryFoo(param: any): Result<number, string> {
 *   const precondition = checkCondition(param, context)
 *   if (!precondition) {
 *     return Err("precondition not met:" + context.state)
 *   }
 *   return Ok(42)
 * }
 * ```
 */
export type Result<T, E> = ResOk<T, never> | ResErr<T, E>

// Internal interface that must be implemented by concrete types.
interface ResultInterface<T, E> {
  type: symbol
  isOk(): boolean
  isErr(): boolean
  // return(): ConcreteResult<T, E>
  /**
   * Unwraps and returns `T` on `Ok<T>`.
   *
   * In most cases, because this function throws on `Err<E>`,
   * use `isOk()` to narrow the variant of `Result` and
   * infer `Result.unwrap(): T` in the success branch.
   * @example
   * ```
   * if(isOk(res)) {
   *   return res.unwrap() // T
   * } else {
   *   return res.unwrapErr() // E
   * }
   * ```
   */
  unwrap(): T | never
  /**
   * Unwraps and returns `E` on `Err<E>`.
   *
   * In most cases, because this function throws on `Err<E>`,
   * use `isErr()` to narrow the variant of `Result` and
   * infer `Result.unwrapErr(): E` in the success branch.
   * @example
   * ```
   * if(isErr(res)) {
   *   return res.unwrapErr() // E
   * } else {
   *   return res.unwrap() // T
   * }
   * ```
   */
  unwrapErr(): E | never
}

interface ResOk<T, E = never> extends ResultInterface<T, E> {
  unwrap(): T
  unwrapErr(): never
}

interface ResErr<T, E> extends ResultInterface<T, E> {
  unwrap(): never
  unwrapErr(): E
}

export function Ok<T, E = never>(val: T): ResOk<T, E> {
  return {
    type: ResultType.Ok,
    isOk(): boolean {
      return true
    },
    isErr(): boolean {
      return false
    },
    unwrap(): T {
      return val
    },
    unwrapErr(): never {
      throw new ReferenceError('Cannot unwrap Err value of Result.Ok')
    },
  }
}

export function Err<T = never, E = unknown>(err: E): ResErr<T, E> {
  return {
    type: ResultType.Err,
    isOk(): boolean {
      return false
    },
    isErr(): boolean {
      return true
    },
    unwrap(): never {
      throw new ReferenceError('Cannot unwrap Ok value of Result.Err')
    },
    unwrapErr(): E {
      return err
    },
  }
}

/**
 * Narrows the variant of `Result` to `OK(T)` or `Err(E)`, inferring
 * the signatures of `Result.unwrap()` and `Result.unwrapErr()`.
 *
 * It is the reverse of {@link isErr}.
 */
export const isOk = <T, E>(val: Result<T, E>): val is ResOk<T> => val.isOk()

/**
 * Narrows the variant of `Result` to `OK(T)` or `Err(E)`, inferring
 * the signatures of `Result.unwrap()` and `Result.unwrapErr()`.
 *
 * It is the reverse of {@link isOk}.
 */
export const isErr = <T, E>(val: Result<T, E>): val is ResErr<T, E> => val.isErr()
