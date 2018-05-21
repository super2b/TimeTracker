<template>
<div class="login" id="login">
    <a href="javascript:;" class="log-close"><i class="icons close"></i></a>
    <h4 style="margin: 0px 0px 20px; text-align: center; color: rgb(48, 128, 254); letter-spacing: 12px; margin-top:40px">登录</h4>
    <div class="log-email">
        <input type="text" placeholder="Email" :class="'log-input' + (account==''?' log-input-empty':'')" v-model="account">
        <input type="password" placeholder="Password" :class="'log-input' + (password==''?' log-input-empty':'')"  v-model="password">
        <a href="javascript:;" class="log-btn" @click="login">登录</a>
    </div>
    <div class="next-row tips" style="text-align: center; margin-bottom:40px">
      <a href="/" style="color: rgb(153, 153, 153); text-decoration: none; font-size: 13px;">立即注册</a>
      <span style="color: rgb(220, 214, 214); margin: 0px 8px;">|</span>
      <a href="/" style="color: rgb(153, 153, 153); text-decoration: none; font-size: 13px;">忘记密码</a></div>
</div>
</template>

<script>
import httpclient from '../httpclient.js'
import qs from 'qs'
import { JSEncrypt } from 'jsencrypt'

var encrypt = new JSEncrypt()
encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDbmDBiBLkPC6Vr39XYoZz9JSdB
nDtw8EXutQJ8zOQ/k3MIAG3LMD/d8ETyR9HILwpbMOVyx7CUK0479ItD1stUcfKK
/hawjD11xw3lMYamAXAINWDTPJwQ55QdNGrvFEbQe819Wm762sPQ+Z5kvHVQ9CAa
k90Qtgp+prPfF2CgFwIDAQAB
-----END PUBLIC KEY-----`)

export default {
  name: 'Login',
  data () {
    return {
      isLoging: false,
      account: '',
      password: ''
    }
  },
  methods: {
    // 登录逻辑
    async login () {
      if (this.account !== '' && this.password !== '') {
        console.log('do login....')
        let encryptedPassword = encrypt.encrypt(this.password)
        console.log('the encryptedPassword:' + encryptedPassword)
        var data = qs.stringify({'name': this.account, 'password': encryptedPassword})
        const loginResult = await httpclient.post('/signin', data)
        // const result = loginResult.data
        console.log(loginResult.data)
        // if (result.success) {
        //   let expireDays = 1000 * 60 * 60 * 24 * 15
        //   this.setCookie('username', this.account, expireDays)
        //   this.$router.replace('/home')
        //   // 登录成功后
        //   this.$router.go(0)
        // }
      }
    },

    // 登录请求
    async doLogin (account, password) {
      // 一般要跟后端了解密码的加密规则
      // 这里例子用的哈希算法来自./js/sha1.min.js
      // let passwordSha = hex_sha1(hex_sha1(this.password))

      // 需要想后端发送的登录参数
      // let loginParam = {
      //   account: this.account,
      //   password_sha
      // }
      var data = qs.stringify({'name': 'leiweibo111', 'password': '123456'})
      // var vm = this
      // axios.post('/signin', data)
      //   .then(function (res) {
      //     console.log('the response:' + res.data.msg)
      //     let expireDays = 1000 * 60 * 60 * 24 * 15
      //     vm.setCookie('username', account, expireDays)
      //     vm.isLoging = false
      //     // vm.$router.replace('/home')
      //     // 登录成功后
      //     // vm.$router.go(0)
      //   }).catch(function (err) {
      //     console.log(err, '------------错误')
      //   })
      const loginResult = await httpclient.post('/signin', data)
      console.log(loginResult.data)
      // 设置在登录状态
      // this.isLoging = true
      // // 演示用
      // setTimeout(() => {
      // // 登录状态15天后过期
      //   let expireDays = 1000 * 60 * 60 * 24 * 15
      //   this.setCookie('username', this.account, expireDays)
      //   this.isLoging = false
      //   this.$router.replace('/home')
      //   // 登录成功后
      //   this.$router.go(0)
      // }, 1000)
    }
  }
}
</script>

<style scoped>
.login{position: fixed; overflow: hidden;left: 50%; margin-left: -250px; top:50%; margin-top: -350px; width: 500px; min-height: 350px; z-index: 10; right: 140px; background: #fff;-webkit-border-radius: 5px;
-moz-border-radius: 5px;
-ms-border-radius: 5px;
-o-border-radius: 5px;
border-radius: 5px; -webkit-box-shadow:  0px 3px 16px -5px #070707; box-shadow:  0px 3px 16px -5px #070707}
.log-close{display: block; position: absolute; top:12px; right: 12px; opacity: 1;}
.log-close:hover .icons{transform: rotate(180deg);}
.log-close .icons{opacity: 1; transition: all .3s}
.log-cloud{background-image: url(../assets/login-cloud.png); width: 63px ;height: 40px; position: absolute; z-index: 1}
.login .cloud1{top:21px; left: -30px; transform: scale(.6); animation: cloud1 20s linear infinite;}
.login .cloud2{top:87px; right: 20px; animation: cloud2 19s linear infinite;}
.login .cloud3{top:160px; left: 5px;transform: scale(.8);animation: cloud3 21s linear infinite;}
.login .cloud4{top:150px; left: -40px;transform: scale(.4);animation: cloud4 19s linear infinite;}
.log-bg{background: #007bff; width: 100%; height: 160px; overflow: hidden;}
.log-logo{height: 80px; margin: 70px auto 25px; text-align: center; color: #fff; font-weight: bold; font-size: 30px;}
.log-text{color: #57d4c3; font-size: 13px; text-align: center; margin: 0 auto;}
.log-logo,.log-text{z-index: 2}
.icons{background:url(../assets/icons.png) no-repeat; display: inline-block;}
.close{height:16px;width:16px;background-position:-13px 0;}
.login-email{height:17px;width:29px;background-position:-117px 0;}
.log-btn{width:370px; display: block; text-align: left; line-height: 50px;margin:0 auto 15px; margin-top: 20px; height:50px; color:#fff; font-size:18px;-webkit-border-radius: 5px; background-color: #3B5999;
-moz-border-radius: 5px;
-ms-border-radius: 5px;
-o-border-radius: 5px;
border-radius: 5px;
position: relative;}
.log-btn.tw{background-color: #13B4E9}
.log-btn.email{background-color: #50E3CE}
.log-btn:hover,.log-btn:focus{color: #fff; opacity: .8;}

.log-email{text-align: center; margin-top: 40px;}
.log-email .log-btn{background-color: #007bff;text-align: center;}
.log-input-empty{border: 1px solid #f37474 !important;}
.isloading{background: #d6d6d6}
.log-btn .icons{margin-left: 30px; vertical-align: middle;}
.log-btn .text{left: 95px; line-height: 50px; text-align: left; position: absolute;}
.log-input{width: 370px;overflow: hidden; padding: 0 15px;font-size: 13px; border: 1px solid #EBEBEB; margin:0 auto 15px; height: 48px; line-height: 48px; -webkit-border-radius: 5px;
-moz-border-radius: 5px;
-ms-border-radius: 5px;
-o-border-radius: 5px;
border-radius: 5px;}
.log-input.warn{border: 1px solid #f88787}

 @-webkit-keyframes cloud1{
    0%{left: 200px}
    100%{left:-130px;}
}
@keyframes cloud1{
    0%{left: 200px}
    100%{left:-130px;}
}

 @-webkit-keyframes cloud2{
    0%{left:500px;}
    100%{left:-90px;}
}
@keyframes cloud2{
    0%{left:500px;}
    100%{left:-90px;}
}

@-webkit-keyframes cloud3{
    0%{left:620px;}
    100%{left:-70px;}
}
@keyframes cloud3{
    0%{left:620px;}
    100%{left:-70px;}
}@-webkit-keyframes cloud4{
    0%{left:100px;}
    100%{left:-70px;}
}
@keyframes cloud4{
    0%{left:100px;}
    100%{left:-70px;}
}

</style>
