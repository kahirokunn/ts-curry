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

type Args<T extends AnyFn> = T extends (...args: infer U) => any ? U : never;
export function curry<T extends AnyFn>(
  fn: T,
): Curryable<T> extends true ? Curry<T> : never {
  let args: any[] = [];

  const curried = (...t: any[]) => {
    args = args.concat(t);

    return args.length >= fn.length ? fn(args) : curried;
  };
  return curried as any;
}
