<template>
  <div class="activite with-icon" :class="typeClass" transition="expand" v-show="subPage >= position">
    <p><span class="icon"></span><span class="main">{{{ text }}}</span></p>
  </div>
</template>

<script>
import is from 'is_js'
import appData from '../services/appData';

export default {
  components: {},
  props: ['text', 'subPage', 'position', 'type'],
  data() {
    return {}
  },
  computed: {
    typeClass() {
      return (this.type == "popup" ? 'popup' : 'onboarding')
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
    margin-top: 3.5vh;
  }

  .main {
    vertical-align: middle;
  }

  &.popup .icon {
    background: url(../assets/icon-pop-up.svg) no-repeat right;
    background-size: contain;
    display: inline-block;
    vertical-align: middle;
    height: 6vh;
    width: 6vh;
    margin-right: 4vh;
  }

  &.onboarding .icon {
    background: url(../assets/icon-onboarding.svg) no-repeat right;
    background-size: contain;
    display: inline-block;
    vertical-align: middle;
    height: 6vh;
    width: 6vh;
    margin-right: 4vh;
  }

}

</style>
