<template>
  <div>
    <div style="margin-bottom: 20px" >
      <div>
       <b-form-input id="textarea1"
            v-model="text"
            form-control
            :placeholder="formplaceholder"
            :state="formstate">
        </b-form-input>
        <div>
          <b-button variant="primary" @click="postTask()" style="margin-top: 10px">
            添加
          </b-button>
        </div>
      </div>
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
        {title: '研究Spring', state: Const.STATES.STOPPED},
        {title: '翻译', state: Const.STATES.STOPPED},
        {title: '研究NodeJS', state: Const.STATES.STOPPED}],
      size: 'sm',
      variant: 'primary',
      formstate: '',
      text: '',
      formplaceholder: 'Enter something'
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
      return len > 0 ? Math.max(res, 1) : res
    },
    postTask: function () {
      if (!this.text) {
        var self = this
        self.formstate = 'invalid'
        self.formplaceholder = 'Please enter content before post'
        setTimeout(function () {
          self.formstate = ''
          self.formplaceholder = 'Enter something....'
          console.log('2000laterrrrr')
        }, 2000)
      } else {
        this.formstate = ''
        this.tasks.unshift({title: this.text, state: Const.STATES.STOPPED})
        this.text = ''
      }
    }
  }
}
</script>
