<template>
  <div>
    <p v-for='i in taskRowLength (tasks)' :key="i">
      <b-card-group columns>
        <Card v-for="j in columns" v-if="(i-1)*columns + (j - 1) < tasks.length" :key="(i-1)*columns + (j - 1)" :title="tasks[(i-1)*columns + (j - 1)]"></Card>
      </b-card-group>
      <Loading msg='loading test'></Loading>
    </p>
  </div>
</template>
<script>
import Const from './Constant'
export default {
  name: 'FAExample',
  data () {
    return {
      columns: Const.COLUMNS,
      tasks: ['学习股票', '研究Spring', '翻译', '研究NodeJS']
    }
  },
  methods: {
    taskRowLength: function (ts) {
      var len = ts.length
      var res = 0
      if (len / this.columns > 1) {
        res = parseInt(len / this.columns) + 1
      } else {
        res = parseInt(len / this.columns)
      }
      console.log('the length:' + res)
      return res
    }
  }
}
</script>
