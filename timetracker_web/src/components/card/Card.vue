<template>
  <div>
    <b-card :title="data[index].title" header-tag="header">
      <p class="card-text">
        <span>{{ hou }}</span>:<span>{{ min }}</span>:<span>{{ sec }}</span>
      </p>
      <div>
        <b-button :disabled="data[index].state==='started'" @click="start(index)">
          <font-awesome-icon :icon="playIcon"/>
        </b-button>
        <b-button :disabled="data[index].state!=='started'" @click="pause()">
          <font-awesome-icon :icon="pauseIcon"/>
        </b-button>
        <b-button @click="stop()">
          <font-awesome-icon :icon="doneIcon"/>
        </b-button>
        <b-button @click="deleteTask()">
          <font-awesome-icon :icon="deleteIcon"/>
        </b-button>
      </div>
    </b-card>
  </div>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'
import faPause from '@fortawesome/fontawesome-free-solid/faPause'
import faDone from '@fortawesome/fontawesome-free-solid/faCheck'
import faDelete from '@fortawesome/fontawesome-free-solid/faTrashAlt'
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
    doneIcon () {
      return faDone
    },
    deleteIcon () {
      return faDelete
    },
    hou () {
      if (this.hour < 10) {
        return '0' + this.hour
      }
      return this.hour
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
      hour: 0,
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
    deleteTask: function () {
      clearInterval(this.interval)
      console.log('delete index:' + this.index)
      this.data.splice(this.index, 1)
      console.log(this.data)
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
      if (this.second < 59) {
        this.second++
        return
      }
      if (this.second >= 59) {
        if (this.minute >= 59) {
          this.hour++
          this.minute = 0
        } else {
          this.minute++
        }
        this.second = 0
      }
      // if (this.second === 0 && this.minute === 0) {
      //   clearInterval(this.interval)
      //   this.minute = Const.RESTING_TIME_LENGTH_IN_MINUTES
      //   this.second = Const.WORKING_TIME_LENGTH_IN_SECONDS
      //   this.data[this.index].state = Const.STATES.STOPPED
      // }
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>
