import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import TaskList from '@/components/TaskList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/list',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
