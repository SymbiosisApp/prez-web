<template>
  <div id="app" :style="{ background: `url(${homeIllu}) no-repeat center` }">
    <div class="right-block">
      <right-part :page="page"></right-part>
    </div>
    <div class="main-block" :class="{ 'full-width': page == 0 }">
      <main-block :page="page"></main-block>
    </div>
  </div>
</template>

<script>
import 'normalize.css/normalize.css';
import './assets/fonts/fonts.css';
import homeIllu from './assets/home.svg';
import RightPart from './components/RightPart';
import MainBlock from './components/MainBlock';

export default {
  components: {
    RightPart,
    MainBlock
  },
  data() {
    return {
      homeIllu,
      loaded: false,
      page: 0
    }
  },
  ready() {
    setTimeout(() => {
      this.loaded = true
    }, 200);
  },
  events: {
    'menu-change': function (index) {
      this.page = index
    }
  }
};
</script>

<style lang="scss">
html, body {
  height: 100%;
  width: 100%;
  background: #A8CDF7;
  overflow: hidden;
}

#app {
  color: white;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.right-block {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 40%;
}
.main-block {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 40%;
  transition-duration: .3s;

  &.full-width {
    right: 0%;
  }
}

</style>
