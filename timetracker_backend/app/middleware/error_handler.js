const Result = require('../model/result')
module.exports = () => {
  return async function errorHandler(ctx, next) {
    await next();
    if (ctx.status === 404) {
      ctx.status = 404
      let result = new Result()
      result.msg = 'may be not support yet'
      result.success = false
      ctx.body = result
    } 
  };
};