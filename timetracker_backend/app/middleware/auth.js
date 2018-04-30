'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    const authorization = ctx.request.headers/authorization;
    if (!authorization) {
      return;
    }
    const toekn = authorization.slice(7)
    const jwtToken = ctx.app.jwt.decode(token, ctx.app.config.jwt.secret);
    if (!jwtToken) {
      ctx.body = {
        status: 403,
        success: false,
        msg: 'token 错误'
      }
      return;
    }

    if (jwtToken.exp < Date.now()) {
      ctx.body = {
        status : 403,
        success: false,
        msg: 'token过期'
      }
    }
    return;
  }

  ctx.current_user = await ctx.app.find('user', {uid: jwtToken.iss});
  if (!ctx.current_user) {
    throw  throwBizError('USER_NOT_FOUND')
  }
  await next();
}