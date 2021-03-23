import { 
  not,
  notEmpty,
  objNotEmpty,
  objNotEmptyDeep,
  notNullOrUndefined,
  notInPrototype
} from '../lib';

describe('Evaluation of base not', () => {
  it('returns true when false', () => {
    expect(not(false)).toBe(true);
  });

  it('returns false when true', () => {
    expect(not(true)).toBe(false);
  });

  it('returns true when falsy', () => {
    expect(not(0)).toBe(true);
    expect(not(null)).toBe(true);
    expect(not(undefined)).toBe(true);
    expect(not('')).toBe(true);
    expect(not(NaN)).toBe(true);
  });

  it('returns false when truthy', () => {
    expect(not(1)).toBe(false);
    expect(not([])).toBe(false);
    expect(not({})).toBe(false);
  });
});

describe('Evaluation of base notEmpty', () => {
  it('returns true when not empty', () => {
    expect(notEmpty({ a: null })).toBe(true);
    expect(notEmpty({ a: 1 })).toBe(true);

    expect(notEmpty([1])).toBe(true);
    expect(notEmpty([null])).toBe(true);

    expect(notEmpty('0')).toBe(true);
  });

  it('returns false when empty', () => {
    expect(notEmpty({})).toBe(false);
    expect(notEmpty([])).toBe(false);
    expect(notEmpty('')).toBe(false);
  });

  it('returns undefined when provided any value other than an array, object, or string', () => {
    expect(notEmpty(9)).toBeUndefined();
    expect(notEmpty(null)).toBeUndefined();
    expect(notEmpty(undefined)).toBeUndefined();
    expect(notEmpty(NaN)).toBeUndefined();
  });
});

describe('Evaluation of not null or undefined checks', () => {
  const nullOrUndefined = [null, undefined],
    notNullUndefined = [[], 9, {}, 0, false];

  it('returns false when null or undefined', () => {
    nullOrUndefined.forEach(_ => expect(notNullOrUndefined(_)).toBe(false));
  });

  it('returns true when not null or undefined', () => {
    notNullUndefined.forEach(_ => expect(notNullOrUndefined(_)).toBe(true));
  });
});

describe('Evaluation obj empty checks', () => {
  const emptyObj = {},
    obj = { a: 1 }; 

  describe('assessment of object not empty (no depth)', () => {
    it('returns true when object not empty', () => {
      expect(objNotEmpty(obj)).toBe(true);
    });
  
    it('returns false when object is empty', () => {
      expect(objNotEmpty(emptyObj)).toBe(false);
    });
  });

  describe('assessment of object not empty (deep', () => {
    const nestedEmptyObj = { a: { b: { c: { d: { } } } } };

    const nestedEmptyFNullObj = { a: { b: { c: { d: { e: null } } } } },
      nestedEmptyFUndefObj = { a: { b: { c: { d: { e: undefined } } } } },
      nestedEmptyFNanObj = { a: { b: { c: { d: { e: NaN } } } } };

    const nestedObj = { a: { b: { c: { d: 1 } } } };

    const nestedFStrObj = { a: { b: { c: { d: '' } } } },
      nestedFArrObj = { a: { b: { c: { d: [1] } } } },
      nestedFNumObj = { a: { b: { c: { d: 0 } } } },
      nestedFBoolObj = { a: { b: { c: { d: false } } } };

    it('returns true when nested object not empty', () => {
      expect(objNotEmptyDeep(nestedObj)).toBe(true);
    });
  
    it('returns false when nested object is empty', () => {
      expect(objNotEmptyDeep(nestedEmptyObj)).toBe(false);
    });

    it('returns true when nested object not empty, and only includes some falsy values', () => {
      expect(objNotEmptyDeep(nestedFStrObj)).toBe(true);
      expect(objNotEmptyDeep(nestedFArrObj)).toBe(true);
      expect(objNotEmptyDeep(nestedFNumObj)).toBe(true);
      expect(objNotEmptyDeep(nestedFBoolObj)).toBe(true);
    });
  
    it('returns false when nested object is empty, and includes null, undefined, or NaN', () => {
      expect(objNotEmptyDeep(nestedEmptyFNullObj)).toBe(false);
      expect(objNotEmptyDeep(nestedEmptyFUndefObj)).toBe(false);
      expect(objNotEmptyDeep(nestedEmptyFNanObj)).toBe(false);
    });
  });
});

describe('Evaluation of prototype exclusion checks', () => {
  const proto = { foo: 'foo' };
  const obj = Object.create(proto);

  it('returns true when object or its prototype does not contain property', () => {
    expect(notInPrototype(obj, 'bar')).toBe(true);
  });

  it('returns false when object or object\'s prototype contains property', () => {
    expect(notInPrototype(obj, 'foo')).toBe(false);
  });
});
