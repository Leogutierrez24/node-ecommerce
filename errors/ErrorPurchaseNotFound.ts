export class ErrorPurchaseNotFound extends Error {
  constructor(message: string = "Purchase not found.") {
    super(message);
  }
}
