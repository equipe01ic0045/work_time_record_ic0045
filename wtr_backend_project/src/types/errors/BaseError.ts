export default abstract class BaseError extends Error {
  constructor(message: string="Internal Server Error.", public httpStatusCode:number=500) {
    super(message);
    this.name = this.constructor.name; // Set the error name to the class name
  }
}
