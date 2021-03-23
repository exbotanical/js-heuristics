export {
  contract,
  testForEach
};

/**
 * 
 * @param {function} predicate 
 * @returns {function}
 */
 function contract (predicate) {
  return function (_) {
    if (predicate(_)) return true;
    throw new Error('Contract violation');
  };
}

/**
 * 
 * @param  {...function} predicates 
 * @returns {boolean}
 */
function testForEach (...predicates) {
  return function (_) {
    return predicates.every(fn => fn(_));
  };
}
