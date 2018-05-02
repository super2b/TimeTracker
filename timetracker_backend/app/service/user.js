const Service = require('egg').Service
const bcrypt = require('bcrypt')

class UserService extends Service {
  async findUser(username, password) {
    const user = await this.app.mysql.get('user', {name: username})
    if (user) {
      const hashedPassword = await bcrypt.hash(password, this.config.salt_bounds)
      if (await bcrypt.compare(password, user.hashed_password)) {
        const token  = await this.app.jwt.sign({_id: user.u_id}, this.config.jwt.secret, {
          expiresIn: this.config.jwttoken.expire_in_min
        })

        await this.app.redis.set(user.u_id, token, 'EX', this.config.jwttoken.expire_in_sec);
        console.log('the new token is:' + token)
        return {
          msg: '登录成功'
        }
      }
    }
    return {
      msg: '用户或者密码错误'
    }
  }

  async createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, this.config.salt_bounds)
    const result = await this.app.mysql.insert('user', {name: username, hashed_password: hashedPassword})
    const token  = await this.app.jwt.sign({_id: result.insertId}, this.config.jwt.secret, {
      expiresIn: this.config.jwttoken.expire_in_min
    })
    await this.app.redis.set(result.insertId, token, 'EX', this.config.jwttoken.expire_in_sec)
    console.log("the token is:" + token);
    return result;
  }
}

module.exports = UserService;
