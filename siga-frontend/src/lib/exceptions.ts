export class ServiceError {
  public message;
  public code;

  constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
  }
}
