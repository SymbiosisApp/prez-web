<template>
  <div class="menu" :class="{ 'white-bg': page == 0 }">
    <ul>
      <li @click="setMenu(0)"><button type="button" name="button" class="btn" :class="{ selected: page == 0 }">Concept</button></li>
      <li @click="setMenu(1)"><button type="button" name="button" class="btn" :class="{ selected: page == 1 }">Application</button></li>
      <li @click="setMenu(2)"><button type="button" name="button" class="btn" :class="{ selected: page == 2 }">Team</button></li>
      <li @click="setMenu(3)"><button type="button" name="button" class="btn" :class="{ selected: page == 3 }">Contact</button></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['page'],
  data() {
    return {};
  },
  methods: {
    setMenu(index) {
      this.$dispatch('menu-change', index)
    }
  }
};
</script>

<style scoped lang="scss">
.menu {
  ul {
    padding: 0;
    margin: 0;
    text-align: center;
    padding: 10px;
  }
  li {
    display: inline-block;
    list-style-type: none;
    padding: 20px 10px;
  }
}
.btn {
  border: none;
  background: none;
  font-family: 'Campton', Tahome, sans-serif;
  font-weight: 400;
  color: #BBB3B3;
  line-height: 20px;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  display: inline-block;

  &:before {
    content: '';
    position: absolute;
    left: -5px;
    right: -5px;
    height: 0px;
    background: #FFF4E6;
    display: block;
    z-index: -1;
    transition-duration: .2s;
    bottom: 5px;
  }

  &:focus {
    outline:0;
  }

  &:hover:before {
    bottom: 0px;
    height: 10px;
  }

  &.selected:before {
    bottom: 0px;
    height: 10px;
  }
}
.menu.white-bg {
  .btn {
    color: white;

    &:before {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
