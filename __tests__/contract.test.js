import { 
  isObject,
  isArray,
  isString,
  isFunction,
  contract,
  testForEach
} from '../lib';

const obj = {},
  arr = [],
  str = '',
  num = 9,
  fn = () => {},
  err = new Error();

const notObject = [arr, err, fn, NaN, null, num, str, Symbol('sym'), undefined],
  notArray = [err, fn, NaN, null, num, obj, str, Symbol('sym'), undefined],
  notString = [arr, err, fn, NaN, null, num, obj, Symbol('sym'), undefined],
  notFunction = [arr, err, NaN, null, num, obj, str, Symbol('sym'), undefined];

describe('Evaluation of base contracts', () => {
  const mustBeObj = contract(isObject),
      mustBeArr = contract(isArray),
      mustBeStr = contract(isString),
      mustBeFn = contract(isFunction);

  it('returns true when a contract is fulfilled', () => {
    expect(mustBeObj(obj)).toBe(true);
    expect(mustBeStr(str)).toBe(true);
    expect(mustBeArr(arr)).toBe(true);
    expect(mustBeFn(fn)).toBe(true);
  });

  it('throws an error when contracts are violated', () => {
    notObject.forEach(_ => expect(() => mustBeObj(_)).toThrow());
    notArray.forEach(_ => expect(() => mustBeArr(_)).toThrow());
    notString.forEach(_ => expect(() => mustBeStr(_)).toThrow());
    notFunction.forEach(_ => expect(() => mustBeFn(_)).toThrow());
  });
});

describe('Evaluation of \'testForEach\'', () => {
  const data = {
    data: [],
    status: 200,
    ok: true,
    error: null
  };

  const notData = {};

  const has = p => o => p in o;

  const isResponse = testForEach(
    has('data'), 
    has('status'), 
    has('ok'), 
    has('error')
  );

  it('returns true when test is fulfilled', () => {
    expect(isResponse(data)).toBe(true);
  });
  
  it('returns false when test is not fulfilled', () => {
    expect(isResponse(notData)).toBe(false);
  });
});
