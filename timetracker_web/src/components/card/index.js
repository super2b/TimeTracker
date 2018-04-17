import CardItem from './Card.vue'
// 这里是重点
const Card = {
  install: function (Vue) {
    Vue.component('Card', CardItem)
  }
}
// 导出组件
export default Card
