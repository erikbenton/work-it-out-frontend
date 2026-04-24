export default class AuthenticationError extends Error {
  userMessages: string[];

  constructor(message: string, userMessages: string[]) {
    super(message);
    this.userMessages = userMessages
  }
}