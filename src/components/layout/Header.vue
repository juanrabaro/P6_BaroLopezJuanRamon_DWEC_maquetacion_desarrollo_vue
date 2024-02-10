<script>
export default {
  name: 'Header',
  props: {
    logout: Function,
    isLogged: Boolean,
  },
  data() {
    return {
      test: true
    }
  },
  methods: {
    onLogout() {
      console.log("logged out")
      this.logout()
    },
  },
  created() {
    // console.log("header", this.isLogged)
  },
  watch: {
    isLogged(oldValue, newValue ) {
      console.log(oldValue)
      console.log(newValue)
    }
  },
  computed: {
    // nose() {
    //   console.log(`computed ${this.isLogged}`)
    //   return `computed ${this.isLogged}`
    // }
  }
}
</script>

<template>
  <header>
    <div class="logo-container">
      <img src="/cloud_3220.png" alt="IMGLOGO">
      <h2>WeatherHub</h2>
    </div>
    <!-- <p>{{ nose }}</p> -->
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/world-time">World Time</router-link>
      <router-link to="/compare-weathers">Compare Weathers</router-link>
      <router-link v-if="isLogged" to="/search-history">Search History</router-link>
      <router-link to="/contact">Contact us</router-link>
      <router-link v-if="!isLogged" to="/" class="log-in-button">Sign In</router-link>
      <router-link v-else-if="isLogged" @click="onLogout" to="/" class="log-in-button">Log Out</router-link>
    </nav>
  </header>
</template>

<style scoped lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15vh;
    border: 2px black solid;
    padding: 0 25px 0 25px;

    a {
      text-decoration: none;
      color: black;
      word-spacing: -2.9px;
    }
    
    .router-link-exact-active {
      color: rgb(56, 87, 148);
    }
  
    a:hover {
      color: rgb(56, 87, 148);
    }

    .logo-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 10px;

      img {
        width: 50px;
      }
    }

    nav {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 17px;

      .log-in-button {
        padding: 5px 10px;
        border-radius: 5px;
        background-color: rgb(56, 87, 148);
        color: white;
        border: none;
        cursor: pointer;
      }

      .log-in-button:hover {
        background-color: rgb(46, 46, 98);
      }
    }
  }
</style>
