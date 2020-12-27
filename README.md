## Install

Install with npm:

```sh
$ npm install --save @kahirokunn/ts-curry
```

Install with yarn:

```sh
$ yarn add @kahirokunn/ts-curry
```

## Spec

```typescript
import { curry } from '../src';

test('curryable', () => {
  function curryable(
    a: number,
    b: string,
    c: `${string}-${string}`,
  ) {
    return '1/2/3';
  }

  const f = curry(curryable);
  const b = f(1);
  const c = b('hello');
  const d = c('1-2');

  expect(d).toBe('1/2/3');
});

test('partial application', () => {
  const add = curry((a: number, b: number) => a + b);
  const add5 = add(5);

  expect(add(0)(0)).toBe(0);
  expect(add(1)(0)).toBe(1);
  expect(add5(5)).toBe(10);
  expect(add5(10)).toBe(15);
  expect(add5(-5)).toBe(0);
});

class BindDog {
  constructor(private readonly sound: string) {
    this.say = this.say.bind(this)
  }

  say(a: string, b: string, c: string) {
    return `${this.sound}${a}${b}${c}`
  }
}

class UnbindDog {
  constructor(private readonly sound: string) {}

  say(a: string, b: string, c: string) {
    return `${this.sound}${a}${b}${c}`
  }
}

test('bind class method', () => {
  const dog = new BindDog('h')
  expect(dog.say('e', 'l', 'l')).toBe('hell');

  const say = dog.say
  expect(say('e', 'l', 'l')).toBe('hell');

  const f = curry(dog.say, dog);
  const a = f('e')
  const b = a('l')
  const c = b('l')

  expect(c).toBe('hell');
});

test('unbind class method', () => {
  const dog = new UnbindDog('h')
  expect(dog.say('e', 'l', 'l')).toBe('hell');

  // should pass context to 2nd args
  const f = curry(dog.say, dog);
  const a = f('e')
  const b = a('l')
  const c = b('l')

  expect(c).toBe('hell');
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
```
