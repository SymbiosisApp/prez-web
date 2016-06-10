<template>
  <div class="abs-full page" :class="getClassesForPage(0, 6)">
    <div class="counter" v-if="state" :class="{cache: subPage < 4}"><span class="counter-steps"><counter-incrementer :val="state.steps" :round="0"></counter-incrementer></span><span class="pas">pas</span></div>
    <div class="activites-list">
      <div class="relativ-box">
        <div class="vertical">
          <activite-item-icon :text="activites[0]" :sub-page="subPage" :position="1" type="popup"></activite-item-icon>
          <activite-item :text="activites[1]" :sub-page="subPage" :position="2"></activite-item>
          <activite-item-icon :text="activites[2]" :sub-page="subPage" :position="3" type="onboarding"></activite-item-icon>
          <activite-item :text="activites[3]" :sub-page="subPage" :position="4"></activite-item>
          <activite-item :text="activites[4]" :sub-page="subPage" :position="5"></activite-item>
          <activite-item-icon :text="activites[5]" :sub-page="subPage" :position="6" type="notif"></activite-item-icon>
        </div>
        <div class="gradient"></div>
      </div>
    </div>
  </div>
</template>

<script>
import is from 'is_js'
import appData from '../services/appData';
import CounterIncrementer from './CounterIncrementer';
import ActiviteItem from './ActiviteItem';
import ActiviteItemIcon from './ActiviteItemIcon';
import * as socket from '../services/sockets';

export default {
  components: {
    CounterIncrementer,
    ActiviteItem,
    ActiviteItemIcon
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
        geoloc: { lat: 48.845566, lng: 2.348988 }
      },
      activites: [
        `Popup : Récupère une graine`,
        `<span style="font-weight: 600">Chloé</span> va jusqu'au parc de Notre Dame`,
        `Explication: Graine, Partage et Déplaces-toi`,
        `<span style="font-weight: 600">Chloé</span> marche jusqu'au Jardin des Plantes`,
        `<span style="font-weight: 600">Chloé</span> marche...`,
        `Notification : Ta plante à grandi !`
      ]
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
      var udpateVal = val - 1
      if (udpateVal >= 0 && udpateVal < this.nbrOfSubPage) {
        var newState = this.getDataForIndex(udpateVal)
        console.log("send " + udpateVal)
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


.counter {
  position: absolute;
  text-align: center;
  font-size: 2vw;
  font-family: 'Campton', Tahoma, sans-serif;
  font-weight: 400;
  margin: 0;
  top: 5vw;
  left: 0;
  right: 0;
  transition-duration: .3s;

  &.cache {
    transform: translateY(-150%);
    opacity: 0;
  }

  .pas {
    text-transform: uppercase;
  }
  .counter-steps {
    font-size: 10vw;
    font-family: 'Caslong';
    font-weight: 300;
  }
}

.top-container{
  position: absolute;
  height: 30vw;
  background: #B9D7F8;
  width: 100%;
  .line-bottom {
    height: 2px;
    position: absolute;
    left: 30vw;
    top: 20vw;
    right: 0;
    background: #A1C4ED;
  }
}

.activites-list {
  position: absolute;
  left: 5%;
  right: 5%;
  bottom: 10%;
  top: 17vw;

  .relativ-box {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .vertical {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30%;
    background-image: linear-gradient(to bottom, #A8CDF7 0%, rgba(#a8cdf7, 0) 100%);
  }
}

</style>
