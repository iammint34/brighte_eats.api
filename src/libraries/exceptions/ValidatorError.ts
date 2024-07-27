class ValidatorError extends Error {
  errors: any;

  constructor(message: string, errors: any) {
    super(message);
    this.errors = errors;
  }
}

export default ValidatorError;
