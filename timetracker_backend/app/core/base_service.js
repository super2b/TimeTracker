const Service = require('egg').Service
const crypto = require('crypto')
const Result = require('../model/result')
var fs = require('fs')
var path = require('path')

class BaseService extends Service {
  decryptPassword(decryptedPasswod) {
    var privatePem = fs.readFileSync(path.join(__dirname, "../../config/rsa_private_key.pem"));  
    var privateKey = privatePem.toString()

    try {
      var textBuffer= new Buffer(decryptedPasswod, "base64"); // jsencrypt 库在加密后使用了base64编码,所以这里要先将base64编码后的密文转成buffer
      var decryptText= crypto.privateDecrypt({
          key: new Buffer(privateKey), // 如果通过文件方式读入就不必转成Buffer
          padding: crypto.constants.RSA_PKCS1_PADDING // 因为前端加密库使用的RSA_PKCS1_PADDING标准填充,所以这里也要使用RSA_PKCS1_PADDING 
      }, textBuffer).toString();
    } catch (err) {
      throw err
    }
    return decryptText;

  }
}

module.exports = BaseService
