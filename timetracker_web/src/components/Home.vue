<template>
  <div>
    <p v-for='i in taskRowLength (tasks)' :key="i">
      <b-card-group columns v-if="i < taskRowLength(tasks)">
        <b-card v-for='j in 3' :title="tasks[(i-1) * 3 + j - 1]" :key="j" header-tag="header">
            <p class="card-text">
              <span>{{ min }}</span>:<span>{{ sec }}</span>
            </p>
            <div>
              <b-button :disabled="state==='started'" @click="start()">
                <font-awesome-icon :icon="playIcon"/>
              </b-button>
              <b-button :disabled="state!=='started'" @click="pause()">
                <font-awesome-icon :icon="pauseIcon"/>
              </b-button>
              <b-button :disabled="state!=='started'" @click="stop()">
                <font-awesome-icon :icon="stopIcon"/>
              </b-button>
            </div>
        </b-card>
      </b-card-group>
      <!-- 处理最后一行 -->
      <b-card-group columns v-if="i === taskRowLength(tasks)">
        <b-card v-for='k in (tasks.length % 3)' :key="k" :title="tasks[(i - 1) * 3 + k - 1]" header-tag="header">
            <p class="card-text">
              <span>{{ min }}</span>:<span>{{ sec }}</span>
            </p>
            <div>
              <b-button :disabled="state==='started'" @click="start()">
                <font-awesome-icon :icon="playIcon"/>
              </b-button>
              <b-button :disabled="state!=='started'" @click="pause()">
                <font-awesome-icon :icon="pauseIcon"/>
              </b-button>
              <b-button :disabled="state!=='started'" @click="stop()">
                <font-awesome-icon :icon="stopIcon"/>
              </b-button>
            </div>
        </b-card>
      </b-card-group>
    </p>
  </div>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'
import faPause from '@fortawesome/fontawesome-free-solid/faPause'
import faStop from '@fortawesome/fontawesome-free-solid/faStop'
import Const from './Constant'
export default {
  name: 'FAExample',
  computed: {
    playIcon () {
      return faPlay
    },
    pauseIcon () {
      return faPause
    },
    stopIcon () {
      return faStop
    },
    min () {
      if (this.minute < 10) {
        return '0' + this.minute
      }
      return this.minute
    },
    sec () {
      if (this.second < 10) {
        return '0' + this.second
      }
      return this.second
    }
  },
  data () {
    return {
      minute: Const.RESTING_TIME_LENGTH_IN_MINUTES,
      second: 0,
      state: Const.STATES.stopped,
      tasks: ['学习股票', '研究Spring', '翻译', '研究NodeJS', '看电视', '研究NBA', '研究大数据', '后台开发']
    }
  },
  methods: {
    start: function () {
      this._tick()
      this.interval = setInterval(this._tick, 1000)
      this.state = Const.STATES.STARTED
    },
    pause: function () {
      this.state = Const.STATES.PAUSED
      clearInterval(this.interval)
    },
    stop: function () {
      clearInterval(this.interval)
      this.minute = Const.RESTING_TIME_LENGTH_IN_MINUTES
      this.second = 0
      this.state = Const.STATES.STOPPED
    },
    _tick: function () {
      if (this.second !== 0) {
        this.second--
        return
      }
      if (this.minute !== 0) {
        this.minute--
        this.second = 59
        return
      }
      if (this.second === 0 && this.minute === 0) {
        this.state = Const.STATES.STOPPED
      }
    },
    taskRowLength: function (ts) {
      var len = ts.length
      console.log('the length:' + len)
      var res = 0
      if (len / 3 > 1) {
        res = parseInt(len / 3) + 1
      } else {
        res = parseInt(len / 3)
      }
      return res
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>
