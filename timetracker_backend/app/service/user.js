const Service = require('../core/base_service')
const bcrypt = require('bcrypt')
const Result = require('../model/result')
const uuid = require('uuid/v4')

class UserService extends Service {
  async findUser(username, password) {
    const user = await this.app.mysql.get('user', {name: username})
    if (user) {
      const decryptedPassword = this.decryptPassword(password)
      if (await bcrypt.compare(decryptedPassword, user.hashed_password)) {
        const token  = await this.app.jwt.sign({_id: user.u_id}, this.config.jwt.secret, {
          expiresIn: this.config.jwttoken.expire_in_min
        })

        await this.app.redis.set(user.u_id, token, 'EX', this.config.jwttoken.expire_in_sec);
        /*
         * Remove the unused properties.
         */
        delete user.hashed_password
        delete user.create_time
        delete user.update_time
        user.token = token
        let result = new Result(true, user, '登录成功')
        return result
      }
    }
    let result = new Result(false, '用户或者密码错误')
    return result
  }

  /**
   * Create new user, used on user register.
   * @param {string} username login name
   * @param {string} password login password
   * @param {string} first_name first name for the user.
   * @param {string} last_name last name of the user.
   */
  async createUser(username, password, first_name, last_name) {
    const {logger} = this.app
    /*
     * Check if the user exists.
     */
    const existedUser = await this.app.mysql.get('user', {name: username})
    if (existedUser) {
      logger.warn('the user existed:' + username)
      return new Result(false, '该用户名已经存在')
    }
    const decryptedPassword = this.decryptPassword(password)
    // logger.debug('the real password when register:' + decryptedPassword)
    const hashedPassword = await bcrypt.hash(decryptedPassword, this.config.salt_bounds)
    let uid = uuid().split('-').join('')
    logger.info('the uid:' + uid)
    const result = await this.app.mysql.insert('user', 
      {u_id: uid, name: username, hashed_password: hashedPassword, first_name: first_name, last_name: last_name})
    
    const token  = await this.app.jwt.sign({_id: uid}, this.config.jwt.secret, {
      expiresIn: this.config.jwttoken.expire_in_min
    })
    await this.app.redis.set(uid, token, 'EX', this.config.jwttoken.expire_in_sec)
    var user = {}
    user.u_id = uid
    user.name = username
    user.first_name = first_name
    user.last_name = last_name
    user.token = token
    return new Result(true, user, '注册用户成功');
  }
}

module.exports = UserService;
