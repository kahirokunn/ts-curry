import { curry } from '../src';

test('curryable', () => {
  function curryable(
    a: number,
    b: string,
    c: `${string}-${string}`,
  ): `${string}/${string}/${string}` {
    return '1/2/3';
  }

  const f = curry(curryable);
  const b = f(1);
  const c = b('hello');
  const d = c('1-2');

  expect(d).toBe('1/2/3');
});

function assertsNever<T extends never>(v: T) {}

test('not curryable because variable argument', () => {
  function notCurryable(
    a: number,
    ...d: string[]
  ): `${string}/${string}/${string}` {
    return '1/2/3';
  }

  const f = curry(notCurryable);
  assertsNever(f);
});
