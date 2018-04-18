<template>
  <div>
    <div style="margin-bottom: 20px" >
      <b-form-textarea id="textarea1"
          v-model="text"
          placeholder="添加任务"
          :rows="1"
          :max-rows="6">
      </b-form-textarea>
      <b-button :size="size" :variant="variant" style="margin-top: 10px;">
          添加
      </b-button>
    </div>
    <p v-for='i in taskRowLength (tasks)' :key="i">
      <b-card-group columns>
        <Card v-for="j in columns"
              v-if="(i-1)*columns + (j - 1) < tasks.length"
              :key="(i-1)*columns + (j - 1)"
              :index="(i-1)*columns + (j - 1)"
              :data="tasks">
        </Card>
      </b-card-group>
      <!--
      <Loading msg='loading test'></Loading>
      -->
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
      tasks: [
        {title: '学习股票', state: Const.STATES.STOPPED},
        {title: '研究Spring', state: Const.STATES.STARTED},
        {title: '翻译', state: Const.STATES.STOPPED},
        {title: '研究NodeJS', state: Const.STATES.STOPPED}],
      size: 'sm',
      variant: 'primary'
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
