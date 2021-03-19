const typeChecks = [
  'Function',
  'String',
  'Number',
  'Error',
  'Object',
  'Array'
].reduce((o, name) => {
  o['is' + name] = x =>
    toString.call(x) == '[object ' + name + ' ]';
    return o;
}, {});

export const { 
  isFunction,
  isString,
  isNumber,
  isError,
  isObject,
  isArray
} = typeChecks;

/**
 * 
 * @param {(object|any)} o 
 * @returns {boolean}
 */
function objNotEmpty (o) {
  if (isObject(o)) return Object.keys(o).length > 0;
  return false;
}

/**
 * 
 * @param {(object|any)} o 
 * @returns {boolean}
 */
function objNotEmptyDeep (o) {
  if (isArray(o)) return o.length > 0;
  if (!isObject(o) && (
    o === 0 ||
    o === '' ||
    !!o
  )) return true;

  if (isObject(o)) {
    return Object.values(o)
      .map(objNotEmptyDeep)
      .includes(true);
  }
}

/**
 * 
 * @param {any} _
 * @returns {boolean}
 */
function notNullOrUndefined (_) {
  return (_ || null) !== null;
} 

/**
 * 
 * @param {object} t 
 * @param {string} p 
 * @returns 
 */
function notInPrototype (t, p) {
  return !p || !Reflect.has(t, p);
}

/**
 * 
 * @param {function} predicate 
 * @returns {function}
 */
function contract (predicate) {
  return function (_) {
    if (predicate(_)) return true;
    throw new Error('Contract violation');
  }
}

/**
 * 
 * @param  {...function} predicates 
 * @returns {boolean}
 */
function testForEach (...predicates) {
  return function (_) {
    return predicates.every(fn => fn(_));
  }
}

export {
  isFunction,
  isString,
  isNumber,
  isError,
  isObject,
  isArray,
  notNullOrUndefined,
  notInPrototype,
  contract,
  testForEach
};