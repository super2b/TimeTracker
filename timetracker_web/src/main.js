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
      return false
    }
  }
})
