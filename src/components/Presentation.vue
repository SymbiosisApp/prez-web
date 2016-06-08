<template>
  <div class="container" :style="{backgroundColor: getBackground() }">
    <div class="controls" :class="{cache: hideControl() }">
      <controls :page="page" :nbr-of-pages="nbrOfPages"></controls>
    </div>
    <div class="abs-full background-home" :class="{cache: page != 0 }"></div>
    <div class="abs-full logo" :class="{cache: page != 0 }"></div>
    <div class="abs-full logo-white" :class="{cache: showLogoWhite() }"></div>
    <div class="abs-full page" :class="getClassesForPage(1, 3)">
      <div class="content">
        <h2>thème</h2>
        <div class="line"></div>
      </div>
    </div>
    <div class="abs-full page" :class="getClassesForPage(1)">
      <div class="content">
        <h1>Du temps<br>pour la<br>nature...</h1>
      </div>
    </div>
    <div class="abs-full page" :class="getClassesForPage(1, 2)">
      <div class="main-illu perso-1" :style="{ opacity: 1  }"></div>
      <div class="main-illu perso-2" :style="{ opacity: page >= 2 ? 1 : 0  }"></div>
    </div>
    <div class="abs-full page" :class="getClassesForPage(2)">
      <div class="content">
        <h1>Valoriser <br>les espaces <br> naturels</h1>
      </div>
    </div>
    <div class="abs-full page" :class="getClassesForPage(3)">
      <div class="main-illu phone-1"></div>
      <div class="content">
        <h1>Le numérique<br/>au service<br />de la nature</h1>
      </div>
    </div>
    <div class="abs-full page" :class="getClassesForPage(4, 5)">
      <div class="play-button" :style="{opacity: page == 4 ? 1 : 0}"></div>
      <video buffered :controls="help" v-el:concept-video class="concept-video" src="static/concept.mov" :style="{opacity: page <= 4 ? 0 : 1 }"></video>
    </div>
    <div class="abs-full page" :class="getClassesForPage(6)">
      <div class="main-illu techos"></div>
      <div class="content">
        <h2>Ptotoype</h2>
        <div class="line"></div>
        <h1>Mise en<br>place</h1>
      </div>
    </div>
    <div class="abs-full page" :class="getClassesForPage(7)">
      <div class="main-illu perso-3"></div>
      <div class="content">
        <h2>utilisatrice</h2>
        <div class="line"></div>
        <h1>Chloé Bouquet<br>25 ans<br>Paris</h1>
      </div>
    </div>
    <div class="illu-progress" :class="{cache: page < 8 || page > 17}"></div>
    <progression :page="page" :nbr-of-pages="nbrOfPages" :from-page="8" :to-page="17"></progression>

    <div class="abs-full page" :class="getClassesForPage(18, 19)">
      <div class="play-button" :style="{opacity: page == 18 ? 1 : 0}"></div>
      <video buffered :controls="help" v-el:teaser-video class="concept-video" src="static/teaser_final.mov" :style="{opacity: page <= 18 ? 0 : 1 }"></video>
    </div>

    <div class="abs-full merci-phone" :class="{cache: page != nbrOfPages - 1 }"></div>
    <div class="abs-full illu-merci" :class="{cache: page != nbrOfPages - 1 }"></div>
    <div class="abs-full page page-merci" :class="getClassesForPage(20)">
      <div class="logos"></div>
      <h1>Merci !</h1>
    </div>
  </div>
</template>

<script>
import is from 'is_js';
import Controls from './Controls';
import Progression from './Progression';

export default {
  components: {
    Controls,
    Progression
  },
  props: ['page', 'nbr-of-pages', 'help'],
  data() {
    return {}
  },
  watch: {
    page(val, oldVal) {
      if (val == 5) {
        this.$els.conceptVideo.play()
      }
      if (val == 4 || val == 6) {
        this.$els.conceptVideo.pause()
      }

      if (val == 19) {
        this.$els.teaserVideo.play()
      }
      if (val == 18 || val == 20) {
        this.$els.teaserVideo.pause()
      }

    }
  },
  methods: {
    isLastOrFirstPage() {
      return this.page == 0 || this.page == this.nbrOfPages - 1
    },
    showLogoWhite() {
      if (this.page >= 19) {
        return true
      }
      if ([0, 5].indexOf(this.page) > -1) {
        return true
      }
      return false
    },
    hideControl() {
      if (this.help) {
        return false
      }
      if ([0, 5, this.nbrOfPages-1, 19].indexOf(this.page) > -1) {
        return true
      }
      return false
    },
    useSecondBack() {
      if (this.isLastOrFirstPage()) {
        return false
      }
      return this.page % 2 == 1
      // return [1, 3, 5, 7, 9, 11].indexOf(this.page) == -1
    },
    getBackground() {
      if (this.page == this.nbrOfPages - 1) {
        return '#A8CDF7';
      }
      if (this.page == 19) {
        return '#000000'
      }
      if (this.page == 18) {
        return '#FFE0D1'
      }
      var colors = ['#A8CDF7', '#A8CDF7', '#A8CDF7', '#FF9C8D', '#FFE0D1', '#000000', '#FFE0D1', '#A8CDF7']
      if (colors[this.page]) {
        return colors[this.page]
      }
      return '#A8CDF7'
    },
    getClassesForPage(forPage, toPage) {
      if (is.existy(toPage)) {
        this.$dispatch('max-nbr-of-pages', toPage)
        // range page
        if (this.page >= forPage && this.page <= toPage) {
          return 'current'
        } else
        if (this.page > forPage) {
          return 'before'
        } else {
          return 'after'
        }
      }
      // Exact match
      this.$dispatch('max-nbr-of-pages', forPage)
      if (this.page === forPage) {
        return 'current'
      } else
      if (forPage < this.page) {
        return 'before'
      } else {
        return 'after'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background: #C2DBF7;

    transition-duration: .3s;

    &.other-back {
      background: #FFE0D1;
    }
  }

  .background-home {
    background: url(../assets/illu-home.svg) no-repeat bottom;
    background-size: 100% auto;
    transition-duration: .3s;
    &.cache {
      transform: translateY(50%);
      opacity: 0;
    }
  }

  .logo {
    background: url(../assets/logo.svg) no-repeat center 35%;
    transition-duration: .3s;
    &.cache {
      transform: translateY(-50%);
      opacity: 0;
    }
  }

  .logo-white {
    background: url(../assets/logo-white.svg) no-repeat 5% 5%;
    transition-duration: .3s;
    &.cache {
      transform: translateY(-50%);
      opacity: 0;
    }
  }

  .phone-1 {
    background: url(../assets/phone-1.png) no-repeat right;
    background-size: contain;
  }

  .perso-1, .perso-2 {
    transition-duration: .3s;
    z-index: 1000;
  }
  .perso-1 {
    background: url(../assets/perso-1.svg) no-repeat right;
    background-size: contain;
  }
  .perso-2 {
    background: url(../assets/perso-2.svg) no-repeat right;
    background-size: contain;
  }

  .perso-3 {
    background: url(../assets/perso-3.svg) no-repeat right;
    background-size: contain;
  }

  .techos {
    background: url(../assets/techos.svg) no-repeat right;
    background-size: contain;
  }

  .play-button {
    background: url(../assets/play-button.svg) no-repeat center;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2000;
    transition-duration: .3s;
  }

  .concept-video {
    position: absolute;
    width: 100%;
    height: 100%;
    transition-duration: .3s;
    z-index: 3001;
  }

  .illu-progress {
    position: absolute;
    background: url(../assets/illu-progress.svg) no-repeat center;
    background-size: contain;
    background-position: bottom left;
    width: 20vw;
    height: 20vw;
    bottom: 0;
    left: 0;
    transition-duration: .3s;
    &.cache {
      bottom: -30vw;
    }
  }

  .controls {
    position: absolute;
    z-index: 4000;
    background: url(../assets/controls.svg) no-repeat center;
    background-size: contain;
    background-position: bottom right;
    width: 20vw;
    height: 20vw;
    bottom: 0;
    right: 0;
    transition-duration: .3s;
    &.cache {
      transform: translateY(50%);
      opacity: 0;
    }
  }

  .merci-phone {
    background: url(../assets/merci-phone.png) no-repeat;
    background-size: cover;
    background-position: top center;
    transition-duration: .3s;
    &.cache {
      opacity: 0;
      transform: translateY(-50%);
    }
  }

  .illu-merci {
    background: url(../assets/illu-merci.svg) no-repeat;
    background-size: 85%;
    background-position: bottom center;
    transition-duration: .3s;
    &.cache {
      opacity: 0;
      transform: translateY(50%);
    }
  }

  .page-merci {
    position: absolute;
    width: 100%;
    height: 100%;

    h1 {
      font-family: 'Caslong';
      font-weight: 300;
      font-size: 8vw;
      position: absolute;
      text-align: center;
      width: 100%;
      top: 45%;
      transform: translateY(-50%);
      margin: 0;
    }

    .logos {
      position: absolute;
      width: 25vw;
      height: 10vw;
      background: url(../assets/logos.svg) no-repeat;
      background-size: contain;
      background-position: center;
      left: 50%;
      top: 65%;
      transform: translate(-50%, -50%);
    }
  }

</style>
