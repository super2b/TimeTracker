<template>
  <h2>
    <span>Pomodoro</span>
    <b-button>
      <font-awesome-icon :icon="icon"/>
    </b-button>
  </h2>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'
export default {
  name: 'FAExample',
  computed: {
    icon () {
      return faPlay
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>
