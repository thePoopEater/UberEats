export class ResponseDTO<T> {
    data: T;
    statusCode: number = 0;
    statusDescription: string = '';
    error: string = '';
    constructor(data: T) {
      this.data = data;
    }
  }