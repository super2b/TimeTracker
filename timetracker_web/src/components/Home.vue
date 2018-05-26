<template>
  <div>
    <div style="margin-bottom: 20px; margin-top: 60px" >
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
import httpclient from '../httpclient.js'
import qs from 'qs'
export default {
  name: 'FAExample',
  data () {
    return {
      columns: Const.COLUMNS,
      tasks: [],
      size: 'sm',
      variant: 'primary',
      formstate: '',
      text: '',
      formplaceholder: '输入任务内容'
    }
  },
  mounted () {
    this.getTaskList(1, 21)
  },
  methods: {
    async getTaskList (pageNo, pageSize) {
      const params = qs.stringify({pageno: pageNo, pagesize: pageSize})
      console.log('the get task params:' + params)
      const taskListResult = await httpclient.get('/tasks', {pageno: pageNo, pagesize: pageSize})
      console.log('the taskListResult:' + taskListResult.data.value.list[0].t_name)
      const dataList = taskListResult.data.value.list
      for (let index in dataList) {
        this.tasks.unshift({title: dataList[dataList.length - 1 - index].t_name, state: Const.STATES.STOPPED})
      }
    },
    // 计算任务的长度来展示任务列表
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
    // 发布一个任务
    async postTask () {
      if (!this.text) {
        var self = this
        self.formstate = 'invalid'
        self.formplaceholder = '内容不能为空'
        setTimeout(function () {
          self.formstate = ''
          self.formplaceholder = '输入任务内容'
        }, 2000)
      } else {
        const data = qs.stringify({'name': this.text, 'desc': 'from webclient'})
        const postResult = await httpclient.post('/task', data)
        console.log('post result:' + postResult.data.msg)
        /*
         * 发布成功，则将本地输入的信息清空，并且添加一个card内容
         */
        const msg = postResult.data.msg
        if (postResult.data.success) {
          this.formstate = ''
          this.tasks.unshift({title: this.text, state: Const.STATES.STOPPED})
          this.text = ''
          this.$notify({
            group: 'foo',
            title: 'Success',
            width: '100%',
            type: 'success',
            text: msg
          })
        } else {
          this.$notify({
            group: 'foo',
            title: 'Failed',
            width: '100%',
            type: 'error',
            text: msg
          })
        }
      }
    }
  }
}
</script>
