/**
 * 成功响应
 * @param {*} data 返回数据
 * @param {string} msg 提示信息
 */
const success = (data = null, msg = 'success') => {
  return {
    code: 0,
    data,
    msg
  };
};

/**
 * 错误响应
 * @param {string} msg 错误信息
 * @param {number} code 错误码
 * @param {*} data 附加数据
 */
const error = (msg = '操作失败', code = -1, data = null) => {
  return {
    code,
    data,
    msg
  };
};

/**
 * 统一响应中间件
 */
const responseMiddleware = (req, res, next) => {
  // 成功方法
  res.success = (data, msg) => {
    res.json(success(data, msg));
  };
  
  // 失败方法
  res.error = (msg, code, data) => {
    res.json(error(msg, code, data));
  };
  
  next();
};

module.exports = responseMiddleware;