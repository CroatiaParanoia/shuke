export enum ResponseErrorCode {
  /** ********************** 用户模块 ********************** **/
  USER_EXIST = 1001,
}

export const ResponseErrorMsgMapping = new Map([
  [ResponseErrorCode.USER_EXIST, '用户已存在'],
]);
