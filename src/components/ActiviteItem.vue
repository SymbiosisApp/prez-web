<template>
  <div class="activite" :class="{ 'no-pas': diffPas == 0  }" transition="expand" v-show="subPage >= position">
    <p class="main">{{{ text }}}</p>
    <p class="pas-diff" v-if="diffPas > 0">+ {{ diffPas }} pas</p>
  </div>
</template>

<script>
import is from 'is_js'
import appData from '../services/appData';

console.log(appData)

export default {
  components: {},
  props: ['text', 'subPage', 'position'],
  data() {
    return {}
  },
  computed: {
    diffPas() {
      let val = this.position - 1
      if (val < 0) {
        return 0
      }
      if (val === 0) {
        return this.getDataForIndex(val).steps
      }
      if (is.existy(appData[val].steps)) {
        var current = appData[val].steps
        var prev = this.getDataForIndex(val-1).steps
        console.log(current)
        return current - prev
      }
      return 0
    }
  },
  methods: {
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

<style lang="scss">

.activite {
  text-align: center;
  padding:0;
  margin: 0;
  font-weight: 300;
  font-size: 3vh;

  &:first-child:before {
    display: none;
  }

  &:before {
    content: "";
    display: block;
    background: white;
    width: 15vw;
    height: 2px;
    margin: auto;
  }

  p {
    margin: 2vh;
  }

  .main {
    margin-top: 3.5vh;
  }

  .pas-diff {
    margin: 1vh;
    font-size: 2vh;
    font-weight: 600;
  }
}
:global {
  .chloe-name {
    font-weight: 600;
  }
}

/* always present */
.expand-transition {
  transition: all .3s ease;
  overflow: hidden;

  &.activite {
    height: 15vh;
  }
  &.no-pas {
    height: 12vh;
  }
}

/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter, .expand-leave {
  opacity: 0;
  margin: 0;
  padding: 0;
  height: 0;
  &.activite {
    opacity: 0;
    margin: 0;
    padding: 0;
    height: 0;
  }
}

</style>
