const Service = require('egg').Service;

class UserService extends Service {
  async getUser(username, password) {
    return {
      'userId': '1'
    }
  }

  async createUser(username, password) {
    const result = await this.app.mysql.insert('user', {name: username, hashed_password: password})
    const token  = await this.app.jwt.sign({_id: result.insertId}, this.config.jwt.secret, {
      expiresIn: this.config.jwttoken.expire_in_min
    })
    await this.app.redis.set(result.insertId, token, 'EX', this.config.jwttoken.expire_in_sec)
    console.log("the token is:" + token);
    return result;
  }
}

module.exports = UserService;
