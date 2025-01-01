export class ErrorUserNotFound extends Error {
  constructor(message: string = "User not Found.") {
    super(message);
  }
}
