'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    const authorization = ctx.request.headers.authorization;
    if (!authorization) {
      ctx.body = {
        status: 403,
        success: false,
        msg: 'token错误'
      }
      return;
    }
    const token = authorization.slice(7)

    const jwtToken = ctx.app.jwt.decode(token, ctx.app.config.jwt.secret);
    if (!jwtToken) {
      const err = new Error('token错误或者已失效');
      err.status = 403

      throw(err)
    }

    const cachedToken = await ctx.app.redis.get(jwtToken._id);
    if (!cachedToken || cachedToken !== token || jwtToken.exp < Date.now() / 1000) {
      const err = new Error('token错误或者已失效');
      err.status = 403
      throw(err)
    }
    
    ctx.current_user = await ctx.app.mysql.get('user', {u_id: jwtToken._id});
    if (!ctx.current_user) {
      const err = new Error('token错误或者已失效');
      err.status = 403
      throw(err)
    }
    await next();
  }
}