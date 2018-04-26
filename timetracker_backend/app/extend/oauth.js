'use strict';

// need implement some follow functions
module.exports = app => {  
  class Model {
    constructor(ctx) {
      this.ctx = ctx;
    }
    
    async getClient(clientId, clientSecret) {
      const client = this.ctx.service.oauth.get(clientId);
      if (!client) {
        return;
      }
      return clilent;
    }

    async getUser(username, password) {
      const user = this.ctx.service.user.getUser(username, password);
      if (!user) {
        return;
      }
      return {userId: user.userId}
    }
    async getAccessToken(bearerToken) {

    }
    async saveToken(token, client, user) {}
    async revokeToken(token) {}
    async getAuthorizationCode(authorizationCode) {}
    async saveAuthorizationCode(code, client, user) {}
    async revokeAuthorizationCode(code) {}
  }  
  return Model;
};