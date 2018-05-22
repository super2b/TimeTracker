'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class BaseService extends Service {
  /**
   * rsa算法密码解密
   * @param {string} decryptedPasswod 被加密过的密码
   * @return {string} decryptText 被解密的密码
   */
  decryptPassword(decryptedPasswod) {
    const privatePem = fs.readFileSync(path.join(__dirname, '../../config/rsa_private_key.pem'));
    const privateKey = privatePem.toString();
    try {
      // jsencrypt库在加密后使用了base64编码,所以这里要先将base64编码后的密文转成buffer
      const textBuffer = new Buffer(decryptedPasswod, 'base64');
      const decryptText = crypto.privateDecrypt({
        key: new Buffer(privateKey), // 如果通过文件方式读入就不必转成Buffer
        padding: crypto.constants.RSA_PKCS1_PADDING, // 因为前端加密库使用的RSA_PKCS1_PADDING标准填充,所以这里也要使用RSA_PKCS1_PADDING
      }, textBuffer).toString();
      return decryptText;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BaseService;
