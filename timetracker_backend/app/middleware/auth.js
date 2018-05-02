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
    console.log(authorization)
    const token = authorization.slice(7)

    const jwtToken = ctx.app.jwt.decode(token, ctx.app.config.jwt.secret);
    if (!jwtToken) {
      ctx.body = {
        status: 403,
        success: false,
        msg: 'token错误'
      }
      return;
    }

    console.log('expire:' + jwtToken.exp + ", now:" + Date.now()/1000);
    const cachedToken = await ctx.app.redis.get(jwtToken._id);
    console.log('token from header:' + token)
    console.log('get the value from redis:' + cachedToken)
    if (!cachedToken || cachedToken !== token || jwtToken.exp < Date.now() / 1000) {
      ctx.body = {
        status : 403,
        success: false,
        msg: 'token过期'
      }
      return;
    }
    
    console.log(jwtToken._id)
    ctx.current_user = await ctx.app.mysql.get('user', {u_id: jwtToken._id});
    if (!ctx.current_user) {
      throw  throwBizError('USER_NOT_FOUND')
    }
    await next();
  }
}