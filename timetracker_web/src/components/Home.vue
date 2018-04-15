<template>
  <div>
    <h2>
      <span>Task1</span>
      <b-button :disabled="state==='started'" @click="start()">
        <font-awesome-icon :icon="playIcon"/>
      </b-button>
      <b-button :disabled="state!=='started'" @click="pause()">
        <font-awesome-icon :icon="pauseIcon"/>
      </b-button>
      <b-button :disabled="state!=='started'" @click="stop()">
        <font-awesome-icon :icon="stopIcon"/>
      </b-button>
    </h2>
    <div class="card card-body bg-light">
      <div class="pomodoro-timer">
        <span>{{ min }}</span>:<span>{{ sec }}</span>
      </div>
    </div>
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
    min: function () {
      if (this.minute < 10) {
        return '0' + this.minute
      }
      return this.minute
    },
    sec: function () {
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
      state: Const.STATES.stopped
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
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>
