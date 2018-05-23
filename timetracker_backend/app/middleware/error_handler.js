'use strict';

const Result = require('../model/result');
module.exports = () => {
  return async function errorHandler(ctx, next) {
    await next();
    if (ctx.status === 404) {
      ctx.status = 404;
      const result = new Result();
      result.msg = 'may be not support yet';
      result.success = false;
      ctx.body = result;
    } else if (ctx.status === 403) {
      ctx.status = 403;
      const result = new Result(false, 'not allowed');
      ctx.body = result;
    }
  };
};
