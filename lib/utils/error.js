export class ContractViolation extends Error {
  constructor (message) {
    super(message);
    this.name = this.constructor.name;
  }
}
