<template>
  <div>
    <h2>
      <span>Task1</span>
      <b-button @click="start()">
        <font-awesome-icon :icon="icon"/>
      </b-button>
    </h2>
    <div class="card card-body bg-light">
      <div class="pomodoro-timer">
        <span>{{ minute }}</span>:<span>{{ second }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'
import Const from './Constant'
export default {
  name: 'FAExample',
  computed: {
    icon () {
      return faPlay
    }
  },
  data () {
    return {
      minute: Const.RESTING_TIME_LENGTH_IN_MINUTES,
      second: 0
    }
  },
  methods: {
    start: function () {
      this._tick()
      this.interval = setInterval(this._tick, 1000)
    },
    _tick: function () {
      if (this.second !== 0) {
        this.second--
        return
      }

      if (this.minute !== 0) {
        this.minute--
        this.second = 59
      }
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>
