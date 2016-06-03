<template>
  <button @click="navPrev" type="button" name="button">Previous</button>
  <button @click="" type="button" name="button">Reset</button>
  <button @click="navNext" type="button" name="button">Next</button>
</template>

<script>

export default {
  components: {},
  methods: {
    navNext() {
      this.$dispatch('nav-next')
    },
    navPrev() {
      this.$dispatch('nav-prev')
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
