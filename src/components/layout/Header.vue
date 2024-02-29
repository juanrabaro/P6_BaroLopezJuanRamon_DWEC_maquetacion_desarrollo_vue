<script>
import { useLoggedStore } from "../stores/loggedStore"
import { mapState, mapActions } from "pinia"

export default {
  name: 'Header',
  computed: {
    ...mapState(useLoggedStore, ["userLogged"]),
  },
  methods: {
    ...mapActions(useLoggedStore, ["logOutStore"]),
    
    // Desloguea al usuario
    logout() {
      this.logOutStore()
    },
    
    // Redirige al usuario a la página de inicio y al formulario de login o signin
    goToLogIn() {
      if (this.$route.path !== '/') {
        this.$router.push('/').then(() => {
          this.$nextTick(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          });
        });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }
  },
}
</script>

<template>
  <header>
    <a href="/">
      <div class="logo-container">
        <img src="/cloud_3220.png" alt="IMGLOGO">
        <h2>WeatherHub</h2>
      </div>
    </a>

    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/world-time">World Time</router-link>
      <router-link to="/compare-weathers">Compare Weathers</router-link>
      <router-link v-if="userLogged.logged" to="/search-history">Search History</router-link>
      <router-link to="/contact">Contact Us</router-link>
      <a v-if="!userLogged.logged" @click="goToLogIn" class="log-in-button">Sign In</a>
      <router-link v-else-if="userLogged.logged" @click="logout" to="/" class="log-in-button">Log Out</router-link>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15vh;
  padding: 0 25px 0 25px;
  font-size: 18px;

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
      background-color: rgb(42, 59, 130);
      color: white;
      border: none;
      cursor: pointer;
    }

    .log-in-button:hover {
      background-color: rgb(5, 20, 88);
    }
  }
}
</style>
