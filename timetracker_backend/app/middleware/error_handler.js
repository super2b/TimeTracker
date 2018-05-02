module.exports = () => {
  return async function errorHandler(ctx, next) {
    await next();
    if (ctx.status === 404) {
      ctx.body = { 
        success: false,
        msg: 'not found222'
       };
    } 
  };
};