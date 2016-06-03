<template>
  <div class="controls" :class="{ cache: page < 1 }" >
    <p class="page-counter"><b>{{ page + 1 }}</b> / {{ nbrOfPages }}</p>
  </div>
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
.controls {
  z-index: 1000;
  background: url(../assets/controls.svg) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  width: 200px;
  height: 257px;
  bottom: 0;
  left: 0;
  transition-duration: .3s;
  opacity: 0.5;
  &.cache {
    transform: translateY(50%);
    opacity: 0;
    &:hover {
      opacity: 0;
    }
  }
  &:hover {
    opacity: 1;
  }
}

.page-counter {
  position: absolute;
  bottom: 17px;
  left: 20px;
  font-size: 24px;
  font-family: 'Campton', Tahoma, sans-serif;
  font-weight: 400;
  letter-spacing: -2px;
  margin: 0;
}

</style>
