export enum ResponseErrorCode {
  /** ********************** 用户模块 ********************** **/
  USER_EXIST = 1001,

  EMAIL_EXIST = 1002,
}

export const ResponseErrorMsgMapping = new Map([
  [ResponseErrorCode.USER_EXIST, '用户已存在'],
  [ResponseErrorCode.EMAIL_EXIST, '邮箱已存在'],
]);
