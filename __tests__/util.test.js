import { ContractViolation } from '../lib/utils/error';

describe('evaluation of local utilities', () => {
  describe('assessment of \'ContractViolation\' error superclass', () => {
    it('throws an instance of \'ContractViolation\'', () => {
      try {
        throw new ContractViolation();
      } catch (ex) {
        expect(ex).toBeInstanceOf(ContractViolation);
      }
    });
    
    it('accepts a custom message', () => {
      const msg = 'this';
      try {
        throw new ContractViolation(msg);
      } catch ({ message }) {
        expect(message).toBe(msg);
      }
    });

    it('sets the \'name\' member', () => {
      try {
        throw new ContractViolation();
      } catch ({ name }) {
        expect(name).toBe('ContractViolation');
      }
    });
  });
});
