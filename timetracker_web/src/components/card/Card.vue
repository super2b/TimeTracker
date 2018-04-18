<template>
  <div>
    <b-card :title="data[index].title" header-tag="header">
      <p class="card-text">
        <span>{{ min }}</span>:<span>{{ sec }}</span>
      </p>
      <div>
        <b-button :disabled="data[index].state==='started'" @click="start(index)">
          <font-awesome-icon :icon="playIcon"/>
        </b-button>
        <b-button :disabled="data[index].state!=='started'" @click="pause()">
          <font-awesome-icon :icon="pauseIcon"/>
        </b-button>
        <b-button :disabled="data[index].state!=='started'" @click="stop()">
          <font-awesome-icon :icon="stopIcon"/>
        </b-button>
      </div>
    </b-card>
  </div>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'
import faPause from '@fortawesome/fontawesome-free-solid/faPause'
import faStop from '@fortawesome/fontawesome-free-solid/faStop'
import Const from '../Constant'
export default {
  name: 'CardItem',
  props: {
    index: Number,
    data: Array
  },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      if (this.data[this.index].state === Const.STATES.STARTED) {
        this.start(this.index)
      }
    })
  },
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
      second: Const.WORKING_TIME_LENGTH_IN_SECONDS
    }
  },
  methods: {
    start: function (index) {
      this._tick()
      if (this.data) {
        for (var d in this.data) {
          console.log(this.data[d])
          if (this.data[d].state === Const.STATES.STARTED) {
            console.log('update state:' + d)
            this.data[d].state = Const.STATES.PAUSED
          } else {
            console.log('note update state')
          }
        }
        this.data[this.index].state = Const.STATES.STARTED
      }
      console.log('the index:' + index)
      this.interval = setInterval(this._tick, 1000)
      this.data[this.index].state = Const.STATES.STARTED
    },
    pause: function () {
      this.data[this.index].state = Const.STATES.PAUSED
      clearInterval(this.interval)
    },
    stop: function () {
      clearInterval(this.interval)
      this.minute = Const.RESTING_TIME_LENGTH_IN_MINUTES
      this.second = Const.WORKING_TIME_LENGTH_IN_SECONDS
      this.data[this.index].state = Const.STATES.STOPPED
    },
    _tick: function () {
      console.log('index:' + this.index + ', state:' + this.data[this.index].state)
      if (this.data[this.index].state === Const.STATES.STOPPED) {
        this.stop()
        return
      } else if (this.data[this.index].state === Const.STATES.PAUSED) {
        this.pause()
        return
      }
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
        clearInterval(this.interval)
        this.minute = Const.RESTING_TIME_LENGTH_IN_MINUTES
        this.second = Const.WORKING_TIME_LENGTH_IN_SECONDS
        this.data[this.index].state = Const.STATES.STOPPED
      }
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>
