<template>
  <div id="app">
    <div v-if="secretIsCorrect == true" class="abs-container" transition="scale">
      <presentation :page="page" :nbr-of-pages="nbrOfPages" :help="help"></presentation>
    </div>
    <div v-else class="login-container"  transition="scale-out">
      <div class="login">
        <p v-if="secretIsCorrect == false">Nope !</p>
        <input type="password" name="secret" v-model="secret" placeholder="secret" @keyup.enter="trySecretKey" autofocus><br />
        <button type="button" @click="trySecretKey">Go !</button>
      </div>
    </div>
  </div>
</template>

<script>
import 'normalize.css/normalize.css';
import './assets/fonts/fonts.css';
import * as socket from './services/sockets';
import Presentation from './components/Presentation';
import {load} from 'vue-google-maps'

load('AIzaSyB8Ij61PnZs_ZrTeI6mx8vFRFCccxGYa00')

export default {
  components: {
    Presentation
  },
  data() {
    return {
      loaded: false,
      page: 0,
      nbrOfPages: 0,
      step: null,
      secretIsCorrect: null,
      secret: '',
      help: false
    }
  },
  watch: {
    page(val, oldVal) {

    },
    secret(val, oldVal) {
      socket.setSecretKey(val)
    }
  },
  ready() {
    // Attach key events
    window.addEventListener('keyup', this.onKeyPressed)

    socket.on('WRONG_KEY', () => {
      this.secretIsCorrect = false
    })

    socket.on('CORRECT_KEY', () => {
      this.secretIsCorrect = true
    })

    setTimeout(() => {
      this.loaded = true
    }, 200);
  },
  methods: {
    onKeyPressed(e) {
      console.log(e.keyCode)
      switch (e.keyCode) {
        case 39: // Right
        case 34: // Presenter next
          this.nextPage()
          break;
        case 37: // Left
        case 33: // Presenter prev
          this.prevPage()
          break;
        case 72: // H
          this.help = !this.help
          break;
        default:

      }
    },
    trySecretKey() {
      socket.emit('TRY_KEY', this.secret)
    },
    nextPage() {
      if (this.page < this.nbrOfPages - 1) {
        this.page += 1
      }
    },
    prevPage() {
      if (this.page > 0) {
        this.page -= 1
      }
    }
  },
  events: {
    'menu-change': function (index) {
      this.page = index
    },
    'max-nbr-of-pages': function (val) {
      if (val + 1 > this.nbrOfPages) {
        this.nbrOfPages = val + 1
      }
    }
  }
};
</script>

<style lang="scss">
html, body {
  height: 100%;
  width: 100%;
  background: #A8CDF7;
  overflow: hidden;
  font-family: 'Campton', Tahoma, sans-serif;
}

#app {
  color: white;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.abs-container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.abs-full {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.login-container{
  background: url(./assets/illu-home.svg) no-repeat bottom;
  background-size: 100% auto;
  height: 100%;
}

.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  input {
    padding: 10px 20px;
    background: white;
    border: none;
    font-size: 1.2em;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  button {
    border: none;
    background: #225CBD;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    display: inline-block;
    width: 100%;
    cursor: pointer;
    transition-duration: .3s;

    &:hover {
      background: #194693;
    }
  }


}


.scale-transition {
  transition: all .3s ease;
}

.scale-enter, .scale-leave {
  transform: scale(0.5);
  opacity: 0;
}

.scale-out-transition {
  transition: all .3s ease;
}

.scale-out-enter, .scale-out-leave {
  transform: scale(2);
  opacity: 0;
}


@import "./style/page.scss";


</style>
