const Service = require('egg').Service;

class OAuthService extends Service {
  async get(clientId) {
    return {
      'clientId': 'client_web',
      'clientSecret': 'my_secret',
      'refreshTokenLifetime': 0,
      'accessTokenLifetime':0,
      'grants': [
        'password'
      ]
    }
  }
}

module.exports = OAuthService;