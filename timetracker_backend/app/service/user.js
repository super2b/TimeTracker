const Service = require('egg').Service;

class UserService extends Service {
  async getUser(username, password) {
    return {
      'userId': '1'
    }
  }
}

module.exports = UserService;
