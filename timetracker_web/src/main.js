// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Login from './components/Login'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Loading from '@/components/loading'
import Card from '@/components/card'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(Loading)
Vue.use(Card)
Vue.config.productionTip = false

// 设置cookie,增加到vue实例方便全局调用
// vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
// 当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (cName, value, expiredays) => {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

// 获取cookie
function getCookie (name) {
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  var arr = document.cookie.match(reg)
  if (arr) {
    return (arr[2])
  } else {
    return null
  }
}

Vue.prototype.getCookie = getCookie

// 删除cookie
Vue.prototype.delCookie = (name) => {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: function (h) {
    var logined = this.checkLogin()
    console.log('logined:' + logined)
    if (logined) {
      return (<App />)
    } else {
      return (<Login />)
    }
  },
  methods: {
    checkLogin () {
      var cookie = this.getCookie('session')
      console.log('the exsted cookie:' + cookie)
      return cookie
    }
  }
})
