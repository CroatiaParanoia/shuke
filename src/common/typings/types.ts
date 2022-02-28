export class BasicResponse<T> {
  code: number;

  data: T;

  message: string;
}
