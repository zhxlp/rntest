export class BaseResult<T> {
  // 错误码 成功时 为空字符串
  code: string;

  // 是否成功 code为空时 为 true
  ok: boolean;

  // 错误消息
  msg: string;

  // 数据
  data: T;

  constructor(code: string, msg?: string, data?: T) {
    this.code = code;
    this.ok = code === '';
    this.msg = typeof msg === 'undefined' ? '' : msg;
    this.data = data as any;
  }

  public static success<T>(d: T): BaseResult<T> {
    return new BaseResult<T>('', '', d);
  }

  public static error<T>(
    code?: string,
    msg?: string,
    data?: any,
  ): BaseResult<T> {
    return new BaseResult<T>(code || 'unknown', msg, data);
  }
}
