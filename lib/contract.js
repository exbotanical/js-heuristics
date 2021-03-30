import { ContractViolation } from './utils/error';

export {
  contract,
  testForEach
};

/**
 * @summary Generate a contractually-bound predicate
 * @param {function} predicate 
 * @param {string?} message
 * @returns {function}
 * @throws {error} when contract is violated
 */
function contract (predicate, message) {
  return function (_) {
    if (predicate(_)) return true;
    throw new ContractViolation(message || 'Contract violation');
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
