<template>
  <span>
    {{ Math.round(nbrOfStepsDisplay) }}
  </span>
</template>

<script>

export default {
  components: {},
  props: ['val'],
  data() {
    return {
      counterIncrementTimeout: -1,
      nbrOfStepsDisplay: 0,
      counterIncrementAmount: 10
    }
  },
  watch: {
    'val': function (val, oldVal) {
      this.animateNbrOfSteps()
    }
  },
  methods: {
    animateNbrOfSteps() {
      clearInterval(this.counterIncrementTimeout)
      let duration = 500;
      let interval = 10;
      let iterate = duration / interval
      let diff = this.val - this.nbrOfStepsDisplay
      this.counterIncrementAmount = diff / iterate;
      this.counterIncrementTimeout = setInterval(this.incrementCounter, interval)
    },
    incrementCounter() {
      if (Math.abs(this.val - this.nbrOfStepsDisplay) <= Math.abs(this.counterIncrementAmount)) {
        this.nbrOfStepsDisplay = this.val
        clearInterval(this.counterIncrementTimeout)
      } else {
        this.nbrOfStepsDisplay += this.counterIncrementAmount
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
