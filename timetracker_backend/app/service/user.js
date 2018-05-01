const Service = require('egg').Service;

class UserService extends Service {
  async getUser(username, password) {
    return {
      'userId': '1'
    }
  }

  async createUser(username, password) {
    const result = await this.app.mysql.insert('user', {name: username, hashed_password: password})
    return result;
  }
}

module.exports = UserService;
