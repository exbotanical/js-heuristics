export {
  isFunction,
  isGenerator,
  isAsyncFunction,
  isAnonymousFunction,
  isRegularFunction,
  isNumber,
  isFloat,
  isString,
  isError,
  isObject,
  isArray,
  isBoolean
};

/* Function Evaluators */

/**
 * @summary Test if the prospect is a function, including async and generator functions
 * @param {any} prospect 
 * @returns {boolean}
 */
function isFunction (prospect) {
  if (prospect) {
    const result = {}.toString.call(prospect);
    
    return result === '[object Function]' || 
      result === '[object AsyncFunction]' ||
      result === '[object GeneratorFunction]';
  } 
  return false;
}

/**
 * @summary Test if the prospect is a generator function
 * @param {any} prospect 
 * @returns {boolean}
 */
function isGenerator (prospect) {
  return !!prospect && prospect.constructor.name === 'GeneratorFunction';
}

/**
 * @summary Test if the prospect is an async function
 * @param {any} prospect 
 * @returns {boolean}
 */
function isAsyncFunction (prospect) {
  return prospect && {}.toString.call(prospect) === '[object AsyncFunction]';
}

/**
 * @summary Test if the prospect is an anonymous function
 * @param {any} prospect 
 * @returns {boolean}
 */
function isAnonymousFunction (prospect) {
  return prospect 
    && isFunction(prospect) 
    && !/(?<=\bfunction\s)(\w+)/.test(prospect.toString());
}

/**
 * @summary Test if the prospect is a regular function i.e. not async, generator, or anonymous
 * @param {any} prospect 
 * @returns {boolean}
 */
function isRegularFunction (prospect) {
  return !!prospect && {}.toString.call(prospect) === '[object Function]' &&
    /(?<=\bfunction\s)(\w+)/.test(prospect.toString());
}

/* Number Evaluators */

/**
 * @summary Test if the prospect is a number
 * @param {any} prospect 
 * @returns {boolean}
 */
function isNumber (prospect) {
  return typeof prospect == 'number' && !isNaN(prospect);
}

/**
 * @summary Test if the prospect is a floating point number
 * @param {any} prospect 
 * @returns {boolean}
 */
function isFloat (prospect) {
  if (typeof prospect === 'symbol' || prospect !== 0 && !prospect) return false;
  return Number(prospect) === prospect && prospect % 1 !== 0;
}

/**
 * @summary Test if the prospect is a string
 * @param {any} prospect 
 * @returns {boolean}
 */
function isString (prospect) {
  return toString.call(prospect) == '[object String]';
}

/**
 * @summary Test if the prospect is an Error
 * @param {any} prospect 
 * @returns {boolean}
 */
function isError (prospect) {
  return toString.call(prospect) == '[object Error]';
}

/**
 * @summary Test if the prospect is a plain object
 * @param {any} prospect 
 * @returns {boolean}
 */
function isObject (prospect) {
  return toString.call(prospect) == '[object Object]';
}

/**
 * @summary Test if the prospect is a plain object
 * @param {any} prospect 
 * @returns {boolean}
 */
 function isArray (prospect) {
  return Array.isArray(prospect);
}

/**
 * @summary Test if the prospect is a Boolean
 * @param {any} prospect 
 * @returns {boolean}
 */
function isBoolean (prospect) {
  return prospect === true || 
    prospect === false || 
    toString.call(prospect) === '[object Boolean]';
}
