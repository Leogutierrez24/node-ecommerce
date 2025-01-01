export class ErrorPasswordNotMatch extends Error {
  constructor(message: string = "The passwords don't match.") {
    super(message);
  }
}
