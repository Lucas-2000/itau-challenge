export class CustomError extends Error {
  constructor(message: string, customName: string) {
    super(message);
    this.name = customName;
  }
}
