<template>
  <p class="page-counter"><b>{{ page + 1 }}</b> / {{ nbrOfPages }}</p>
</template>

<script>
import is from 'is_js'

export default {
  components: {},
  props: ['page', 'nbr-of-pages'],
  data() {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.page-counter {
  position: absolute;
  bottom: 3vw;
  right: 6vw;
  font-size: 2vw;
  font-family: 'Campton', Tahoma, sans-serif;
  font-weight: 200;
  letter-spacing: -2px;
  margin: 0;
}

</style>
