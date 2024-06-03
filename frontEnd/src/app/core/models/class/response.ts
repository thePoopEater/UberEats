export class Response<T> {
  data: T;
  statusCode: number = 0;
  statusDescription: string = "";

  constructor(type: T) {
    this.data = type;
  }
}

