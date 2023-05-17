export default class GenericError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.success = false;
  }
}
