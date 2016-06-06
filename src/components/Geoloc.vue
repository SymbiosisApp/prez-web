<template>
  <div class="full-size" @click.stop>
    <map
      :options="mapOptions"
      :center="valueDisplay"
      :zoom="15"
      :draggable="false"
    >
    <marker
      :position="valueDisplay"
      :clickable="false"
      :draggable="false"
    ></marker>
    </map>
  </div>
</template>

<script>
import { Map, Marker } from 'vue-google-maps'
import mapStyle from '../services/map-style'

export default {
  components: {
    Map,
    Marker
  },
  props: {
    state: null
  },
  data () {
    return {
      mapOptions: {
        draggable: false,
        scrollwheel: false,
        panControl: false,
        disableDefaultUI: true,
        styles: mapStyle
      },
      valueDisplay: { lat: 48.8746253, lng: 2.38835662 },
      counterIncrementTimeout: -1,
      counterIncrementAmount: { lat: 1, lng: 1}
    }
  },
  computed: {
    geoloc() {
      console.log(this.state)
      if (!this.state) {
        debugger;
        return { lat: 48.8746253, lng: 2.38835662 }
      }
      return this.state.geoloc
    }
  },
  watch: {
    geoloc(val, oldVal) {
      this.animateGeoloc()
    }
  },
  methods: {
    animateGeoloc() {
      clearInterval(this.counterIncrementTimeout)
      let duration = 500;
      let interval = 1000/30;
      let iterate = duration / interval
      this.counterIncrementAmount = {
        lat: (this.geoloc.lat - this.valueDisplay.lat) / iterate,
        lng: (this.geoloc.lng - this.valueDisplay.lng) / iterate
      }
      this.counterIncrementTimeout = setInterval(this.incrementCounter, interval)
    },
    incrementCounter() {
      if (this.geoloc == null) {
        debugger;
      }
      if (Math.abs(this.geoloc.lat - this.valueDisplay.lat) <= Math.abs(this.counterIncrementAmount.lat)) {
        this.valueDisplay = this.geoloc
        clearInterval(this.counterIncrementTimeout)
      } else {
        this.valueDisplay.lat += this.counterIncrementAmount.lat
        this.valueDisplay.lng += this.counterIncrementAmount.lng
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

<style lang="scss" scoped>
.full-size{
  width: 100%;
  height: 100%;
}
</style>
