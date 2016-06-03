<template>
  <div class="container" :class="{'other-back': useSecondBack() }">
    <div class="abs-full background-home" :class="{cache: !isLastOrFirstPage()}"></div>
    <div class="abs-full logo" :class="{cache: !isLastOrFirstPage(), 'on-top': page == nbrOfPages - 1}"></div>
    <div class="abs-full illu-1" :class="{cache: isLastOrFirstPage()}"></div>
    <controls :page="page" :nbr-of-pages="nbrOfPages"></controls>
    <div class="abs-full page" :class="getClassesForPage(1)">
      <h1>Page 1</h1>
    </div>
    <div class="abs-full page" :class="getClassesForPage(2)">
      <h1>Page 2</h1>
    </div>
    <div class="abs-full page" :class="getClassesForPage(3, 5)">
      <h1>Page 3</h1>
      <p class="abs-full page" :class="getClassesForPage(4)">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </p>
    </div>
    <progression :page="page" :nbr-of-pages="nbrOfPages" :from-page="6" :to-page="11"></progression>
    <div class="abs-full page page-merci" :class="getClassesForPage(12)">
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
  props: ['page', 'nbr-of-pages'],
  data() {
    return {}
  },
  methods: {
    isLastOrFirstPage() {
      return this.page == 0 || this.page == this.nbrOfPages - 1
    },
    useSecondBack() {
      if (this.isLastOrFirstPage()) {
        return false
      }
      return this.page % 2 == 1
      // return [1, 3, 5, 7, 9, 11].indexOf(this.page) == -1
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
    background: url(../assets/logo.svg) no-repeat center 40%;
    transition-duration: .3s;
    &.on-top {
      background-position: center 20%;
    }
    &.cache {
      transform: translateY(-50%);
      opacity: 0;
    }
  }

  .illu-1 {
    background: url(../assets/illu-1.svg) no-repeat bottom right;
    transition-duration: .3s;
    &.cache {
      transform: translateY(50%);
      opacity: 0;
    }
  }

</style>
