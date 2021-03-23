import { 
  isObject, 
  isString, 
  isArray, 
  isFunction,
  isError,
  isNumber
} from '../lib';

/* Local Mocks */
const obj = {},
  arr = [],
  str = '',
  num = 9,
  fn = () => {},
  err = new Error();

  
const notObject = [arr, fn, NaN, null, num, str, Symbol('sym'), undefined],
  notArray = [fn, NaN, null, num, obj, str, Symbol('sym'), undefined],
  notString = [arr, fn, NaN, null, num, obj, Symbol('sym'), undefined],
  notFunction = [arr, NaN, null, num, obj, str, Symbol('sym'), undefined],
  notNumber = [arr, fn, NaN, null, obj, str, Symbol('sym'), undefined];

describe('Evaluation of type checks', () => {
  it('returns true for matched types', () => {
    expect(isObject(obj)).toBe(true);
    expect(isString(str)).toBe(true);
    expect(isArray(arr)).toBe(true);
    expect(isFunction(fn)).toBe(true);
    expect(isError(err)).toBe(true);
    expect(isNumber(num)).toBe(true);
  });

  it('returns false for non-matched types', () => {
    notObject.forEach(_ => expect(isObject(_)).toBe(false));
    notArray.forEach(_ => expect(isArray(_)).toBe(false));
    notString.forEach(_ => expect(isString(_)).toBe(false));
    notFunction.forEach(_ => expect(isFunction(_)).toBe(false));
    notNumber.forEach(_ => expect(isNumber(_)).toBe(false));
  });
});



