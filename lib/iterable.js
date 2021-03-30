import { not } from './not';
import { isNumber, isString } from './type';

export {
  range
};

/**
 * @summary Generate an iterable range
 * @param {(number|string)} start lower limit of range
 * @param {(number|string)} end upper limit of range
 * @returns {IterableIterator<string>}
 * @example if (n in range(1, 20)) doStuff();
 */
function range (start, end) {
  if (
    (not(isNumber(start)) && not(isString(start))) ||
    (not(isNumber(end)) && not(isString(end)))
  ) return [];
  return new Proxy({ start, end }, {
    has (target, prop) {
      return prop >= target.start && prop <= target.end;
    }
  });
}
