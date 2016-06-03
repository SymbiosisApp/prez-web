<template>
  <div class="abs-full page" :class="getClassesForPage(0, 5)">
    <div class="counter" v-if="state"><counter-incrementer :val="state.steps" :round="0"></counter-incrementer></div>
    <div class="geoloc-map">
      <geoloc :state="state"></geoloc>
    </div>
  </div>
  <div class="abs-full page" :class="getClassesForPage(0)">
    <h1>Prensent 1</h1>
  </div>
  <div class="abs-full page" :class="getClassesForPage(1)">
    <h1>Prensent 2</h1>
  </div>
  <div class="abs-full page" :class="getClassesForPage(2)">
    <h1>Prensent 3</h1>
  </div>
  <div class="abs-full page" :class="getClassesForPage(3)">
    <h1>Prensent 4</h1>
  </div>
  <div class="abs-full page" :class="getClassesForPage(4)">
    <h1>Prensent 4</h1>
  </div>
  <div class="abs-full page" :class="getClassesForPage(5)">
    <h1>Prensent 4</h1>
  </div>
</template>

<script>
import is from 'is_js'
import appData from '../services/appData';
import CounterIncrementer from './CounterIncrementer';
import Geoloc from './Geoloc';
import * as socket from '../services/sockets';

export default {
  components: {
    CounterIncrementer,
    Geoloc
  },
  props: {
    page: Number,
    nbrOfPages: Number,
    fromPage: Number,
    toPage: Number
  },
  data() {
    return {
      state: {
        geoloc: { lat: 48.8746253, lng: 2.38835662 }
      },
    }
  },
  computed: {
    nbrOfSubPage() {
      return 1 + this.toPage - this.fromPage
    },
    subPage() {
      var result = this.page - this.fromPage
      return result
    }
  },
  ready() {
    socket.on('STATE_UPDATED', (newState) => {
      this.state = newState
    })
  },
  watch: {
    subPage(val, oldVal) {
      if (val >= 0 && val < this.nbrOfSubPage) {
        var newState = this.getDataForIndex(val)
        socket.emitWithKey('UPDATE_STATE', newState)
      }
    }
  },
  methods: {
    getClassesForPage(forPage, toPage) {
      if (is.existy(toPage)) {
        this.$dispatch('max-nbr-of-pages', toPage)
        // range page
        if (this.subPage >= forPage && this.subPage <= toPage) {
          return 'current'
        } else
        if (this.subPage > forPage) {
          return 'before'
        } else {
          return 'after'
        }
      } else {
        // Exact match
        this.$dispatch('max-nbr-of-pages', forPage)
        if (this.subPage === forPage) {
          return 'current'
        } else
        if (forPage < this.subPage) {
          return 'before'
        } else {
          return 'after'
        }
      }
    },
    getDataForIndex(index) {
      var result = appData[0]
      for (var i = 0; i <= index; i++) {
        result = {
          ...result,
          ...appData[i]
        }
      }
      return result
    }
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

.counter {
  position: absolute;
  font-size: 24px;
  font-family: 'Campton', Tahoma, sans-serif;
  font-weight: 400;
  margin: 0;
  top: 20%;
  right: 10%;
}

.geoloc-map {
  position: absolute;
  width: 15rem;
  height: 15rem;
  z-index: 1200;
  overflow: hidden;
  border-radius: 100%;
  border: 5px solid white;
}

</style>
