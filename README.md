# js-heuristics 

## Useful heuristics, type checks, and validation helpers for JavaScript

[![Build Status](https://travis-ci.org/MatthewZito/js-heuristics.svg?branch=master)](https://travis-ci.org/MatthewZito/js-heuristics)
[![Coverage Status](https://coveralls.io/repos/github/MatthewZito/js-heuristics/badge.svg?branch=main)](https://coveralls.io/github/MatthewZito/js-heuristics?branch=main)

`js-heuristics` is a library of useful heuristics, type checks, and validation helpers for JavaScript. Instead of repeatedly checking types, evaluating whether or not an API response is null (or indeed an object, only entirely empty), you can depend on this tested, consistent library API to get the job done.

![Exquisite GIF of Hagrid](docs/urawiz.gif "the maintainer does not guarantee this will happen to you")

*using this lib*

## Table of Contents

- [Supported Environments](#builds) 
- [Installation + Usage](#usage)
- [Documentation / API](#docs)
  - [Type Checks](#typecheck)
  - [Validators](#validate)
  - [Contracts](#contract)
  - [Iterators](#iter)
  
## <a name="builds"></a> Supported Environments

`js-heuristics` currently supports UMD, CommonJS (node versions >= 10), and ESM build-targets. Is your preferred build not supported? Open an issue!

## <a name="usage"></a> Installation + Usage

```bash
npm install js-heuristics
# OR
yarn add js-heuristics
```

Commonjs: 

```js
const { isObject } = require('js-heuristics');

console.log(isObject({})); // true
```

ESM:

```js
import { isObject } from 'js-heuristics';
```

## <a name="docs"></a> Documentation / Core API

### <a name="typecheck"></a> Type Checks

#### isFunction (arg: any): boolean

*evaluate whether the provided argument is a function*

**Example**

```js
import { isFunction } from 'js-heuristics';

var fn = () => ({});

var t = isFunction(fn);

console.log(t); // true
```

#### isString (arg: any): boolean

*evaluate whether the provided argument is a string*

**Example**

```js
import { isFunction } from 'js-heuristics';

var fn = () => ({});

var t = isFunction(fn);

console.log(t); // true
```

#### isError (arg: any): boolean

*evaluate whether the provided argument is an Error object*

**Example**

```js
import { isError } from 'js-heuristics';

...
var result = await fetchData(); 
...
if (isError(result)) this.error = true;
else this.data = result.data;
```

#### isObject (arg: any): boolean

*evaluate whether the provided argument is an object*

**Example**

```js
import { isObject } from 'js-heuristics';

const r = corneliusCardewIsDaBeezKnees();

if (isObject(r)) ...
```

#### isArray (arg: any): boolean

*evaluate whether the provided argument is an array*

**Example**

```js
import { isArray } from 'js-heuristics';

var notAnArr = '';

console.log(isArray(notAnArr)); // false
```

#### isNumber (arg: any): boolean

*evaluate whether the provided argument is a number*
**Note** Will return false for *NaN*

**Example**

```js
import { isNumber } from 'js-heuristics';

console.log(isNumber(9)); // true

console.log(isNumber(NaN)); // false
```

### <a name="validate"></a> Validators

#### not (arg: any): boolean

*convert any expression or value to a negated boolean*

**Example**

```js
import { not } from 'js-heuristics';

if (not(obj)) ...

if (not(bool)) ...

if (not(expr)) ...
```

#### notEmpty (arg: (string|array|object)): boolean

*evaluate whether the provided argument is __not__ empty*
**Note** Will return undefined for non array, object, or string arguments

**Example**

```js
import { notEmpty } from 'js-heuristics';

if (notEmpty(obj)) ...
```

#### objNotEmpty (arg: any): boolean

*evaluate whether the provided object is __not__ empty (no keys)*

**Example**

```js
import { objNotEmpty } from 'js-heuristics';

if (objNotEmpty(obj)) ...
```

#### objNotEmptyDeep (arg: any): boolean

*evaluate whether the provided object is __not__ empty, no matter how nested*

**Note** Object's values are not null, NaN, or undefined

**Example**

```js
import { objNotEmptyDeep } from 'js-heuristics';

var o = {
  a: {
    b: {
      c: {
        d: 1
      }
    }
  }
}

if (objNotEmptyDeep(o)) ... // true
```

#### notNullOrUndefined (arg: any): boolean

*Explicitly determine if given value is __not__ null or undefined*

**Example**

```js
import { notNullOrUndefined } from 'js-heuristics';

if (notNullOrUndefined(o)) ...
```

#### notInPrototype (target: object, prop: string): boolean

*Determine if a property does __not__ exist on an object or its prototype chain*

**Example**

```js
import { notInPrototype } from 'js-heuristics';

var proto = { foo: 'foo' };
var obj = Object.create(proto);

if (notInPrototype(obj, 'foo')) ... // false

if (notInPrototype(obj, 'bar')) ... // true
```

### <a name="contract"></a> Contracts

#### contract (predicate: Function, message?: string): Function

*Generate a predicate-bound contract; either returns true or throws a violation*

**Example**

```js
import { contract, isObject } from 'js-heuristics';

const mustBeObject = contract(isObject);

var o = {};
var a = [];

if (mustBeObject(o)) ... // true

if (mustBeObject(a)) ... // throws


const contractWithMessage = contract(isObject, 'Must be an object');

try {
  contractWithMessage('str');
} catch ({ message }) {
  console.log(message); // 'Must be an object'
} 
```

#### testForEach (...predicates: Function[]): boolean

*Generate a reducer that enforces all provided predicates on a given argument*

**Example**

```js
import { testForEach, isObject } from 'js-heuristics';

function hasData () { ... }

const isApiData = testForEach(isObject, hasData);

if (isApiData(response)) ...
```


### <a name="iter"></a> Iterators

#### range (start: (number|string), end: (number|string)): IterableIterator<string>

*Generate an iterable range*

**Example**

```js
import { range } from 'js-heuristics';

const enumValue = 10;

const enumChar = 'E';

if (enumValue in range(1, 20)) ... // true

if (enumValue in range(1, 5)) ... // false

if (enumChar in range('A', 'z')) ... // true

if (enumChar in range('a', 'd')) ... // false
```
