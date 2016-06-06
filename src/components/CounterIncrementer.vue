<template>
  <span>
    {{ formatNum(valueDisplay) }}
  </span>
</template>

<script>

export default {
  components: {},
  props: ['val', 'round'],
  data() {
    return {
      valueDisplay: 0,
      counterIncrementTimeout: -1,
      counterIncrementAmount: 10
    }
  },
  watch: {
    val(val, oldVal) {
      this.animateNbrOfSteps()
    }
  },
  methods: {
    animateNbrOfSteps() {
      clearInterval(this.counterIncrementTimeout)
      let duration = 500;
      let interval = 1000/30;
      let iterate = duration / interval
      let diff = this.val - this.valueDisplay
      this.counterIncrementAmount = diff / iterate;
      console.log("increment", diff / iterate)
      this.counterIncrementTimeout = setInterval(this.incrementCounter, interval)
    },
    incrementCounter() {
      if (Math.abs(this.val - this.valueDisplay) <= Math.abs(this.counterIncrementAmount)) {
        this.valueDisplay = this.val
        clearInterval(this.counterIncrementTimeout)
      } else {
        this.valueDisplay += this.counterIncrementAmount
      }
    },
    formatNum(num) {
      let multiplier = Math.pow(10, this.round)
      let result = Math.floor(num * multiplier) / multiplier
      return result
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
