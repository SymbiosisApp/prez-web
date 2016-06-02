<template>
  <div class="right-part">
    <div class="menu-container">
      <menu :page="page"></menu>
    </div>
    <div class="text-content" :class="{ 'not-visible': page == 0 }">

    </div>
  </div>
</template>

<script>
import Menu from './Menu';

export default {
  components: {
    Menu
  },
  props: ['page'],
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.right-part{
  position: relative;
  height: 100%;
  width: 100%;
}
.text-content {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: white;
  transition-duration: .3s;

  &.not-visible {
    transform: translateX(100%)
  }
}
.menu-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 80px;
  z-index: 1000;
}
</style>
