type Fn<T, U> = T extends any[] ? (...args: T) => U : (arg: T) => U;
type AnyFn = Fn<any[], any>;
type ArgNum<T extends AnyFn> = T extends (...args: infer R) => any
  ? R['length']
  : never;

type isTuple<T extends { length: number }> = T['length'] extends number
  ? number extends T['length']
    ? false
    : true
  : true;
type Curryable<T extends AnyFn> = isTuple<Args<T>>;

type Fns<T extends AnyFn> = T extends (
  ...args: [infer F, ...infer R]
) => infer U
  ? (arg: F) => Curry<Fn<R, U>>
  : never;
export type Curry<T extends AnyFn> = ArgNum<T> extends 1 ? T : Fns<T>;

type Unsupport = never;

type Args<T extends AnyFn> = T extends (...args: infer U) => any ? U : never;
export function curry<T extends AnyFn>(
  fn: T,
  context: any = null,
): Curryable<T> extends true ? Curry<T> : Unsupport {
  const curried: any = function (this: any, ...t: any[]) {
    if (t.length >= fn.length) {
      return context ? fn.call(context, ...t) : fn(...t);
    }
    return curried.bind(null, ...t);
  };
  return curried;
}
