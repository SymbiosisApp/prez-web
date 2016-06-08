<template>
  <div class="activite" transition="expand" v-show="subPage >= position">
    <p class="main">{{{ text }}} <span class="pas-diff" v-if="diffPas > 0">+ {{ diffPas }} pas</span></p>
  </div>
</template>

<script>
import is from 'is_js'
import appData from '../services/appData';

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
    background: rgba(255, 255, 255, 0.5);
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
    margin-left: 2vw;
    font-weight: 800;
    color: #225CBD;
  }
}

</style>
