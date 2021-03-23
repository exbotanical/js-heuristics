import { 
  isObject, 
  isArray,
  isString
} from './type';

export {
  notEmpty,
  objNotEmpty,
  objNotEmptyDeep,
  notNullOrUndefined,
  notInPrototype,
  not
};

/**
 * @summary Evaluate whether the given object, array, or string is __not__ empty
 * @param {(array|object|string)} a 
 * @returns {boolean}
 */
function notEmpty (a) {
  if (isArray(a)) return !!a.length;
  if (isObject(a)) return !!Object.keys(a).length;
  if (isString(a)) return !!a;
}

/**
 * @summary Evaluate whether the provided object is __not__ empty (depth of 1)
 * @param {(object|any)} o 
 * @returns {boolean}
 */
 function objNotEmpty (o) {
  if (isObject(o)) return Object.keys(o).length > 0;
  return false;
}

/**
 * @summary Evaluate whether the provided object is __not__ empty, or does not contain
 * only values null, NaN, or undefined - infinite depth / nesting
 * @param {(object|any)} o 
 * @returns {boolean}
 */
function objNotEmptyDeep (o) {
  const blacklist = [NaN, undefined, null];

  if (isArray(o)) return o.length > 0;
  if (!isObject(o) && !blacklist.includes(o)) return true;

  if (isObject(o)) {
    return Object.values(o)
      .map(objNotEmptyDeep)
      .includes(true);
  }
}

/**
 * @summary Explicitly determine if given value is __not__ null or undefined
 * @param {any} _
 * @returns {boolean}
 */
function notNullOrUndefined (_) {
  if (_ == 0) return true;
  return (_ || null) !== null;
} 

/**
 * @summary Determine if a property does __not__ exist on an object or its prototype chain
 * @param {object} t The target object to test
 * @param {string} p The property to check for in the given object or its prototype 
 * @returns {boolean}
 */
function notInPrototype (t, p) {
  return !p || !Reflect.has(t, p);
}

/**
 * @summary Convert any expression or value to a negated boolean
 * @param {any} test 
 * @returns {boolean}
 */
function not (test) {
  return !(!!test); // eslint-disable-line no-extra-boolean-cast
}
