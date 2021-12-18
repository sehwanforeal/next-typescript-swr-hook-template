export class CustomNetworkError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "CustomNetworkError";
  }
}
