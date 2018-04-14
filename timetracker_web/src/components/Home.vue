<template>
  <div id="app">
    <font-awesome-icon :icon="icon" />
  </div>
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
