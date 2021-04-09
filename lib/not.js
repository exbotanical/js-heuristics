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
 * @param {(array|object|string)} prospect
 * @returns {boolean}
 */
function notEmpty (prospect) {
  if (isArray(prospect)) return !!prospect.length;
  if (isObject(prospect)) return !!Object.keys(prospect).length;
  if (isString(prospect)) return !!prospect;
}

/**
 * @summary Evaluate whether the provided object is __not__ empty (depth of 1)
 * @param {(object|any)} prospect
 * @returns {boolean}
 */
 function objNotEmpty (prospect) {
  if (isObject(prospect)) return Object.keys(prospect).length > 0;
  return false;
}

/**
 * @summary Evaluate whether the provided object is __not__ empty, or does not contain
 * only values null, NaN, or undefined - infinite depth / nesting
 * @param {(object|any)} prospect
 * @returns {boolean}
 */
function objNotEmptyDeep (prospect) {
  const blacklist = [NaN, undefined, null];

  if (isArray(prospect)) return prospect.length > 0;
  if (!isObject(prospect) && !blacklist.includes(prospect)) return true;

  if (isObject(prospect)) {
    return Object.values(prospect)
      .map(objNotEmptyDeep)
      .includes(true);
  }
}

/**
 * @summary Explicitly determine if given value is __not__ null or undefined
 * @param {any} _
 * @returns {boolean}
 */
function notNullOrUndefined (prospect) {
  return !(prospect === null || prospect === undefined);
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
 * @param {any} prospect
 * @returns {boolean}
 */
function not (prospect) {
  return !(!!prospect); // eslint-disable-line no-extra-boolean-cast
}
