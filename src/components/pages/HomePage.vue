<script>
import SignInForm from '../childComponents/SignInForm.vue';
import LogInForm from '../childComponents/LogInForm.vue';

import { exampleData } from '../../assets/exampleData/tiempoCiudad.js';

export default {
  name: 'HomePage',
  components: {
    SignInForm,
    LogInForm,
    LogInForm
  },
  data() {
    return {
      exampleCityTimeData: null,
      temperatureConclusionResult: String,
    }
  },
  props: {
    login: Function,
    logout: Function,
    isLogged: Boolean,
    user: Object,
    userExistMessage: String,
    userNotExistMessage: String,
    sigin: Function,
  },
  methods: {
    onLogout() {
      console.log("logged out")
      this.logout()
    },
    async fetchData() {
      fetch('http://localhost/api/ciudades')
        .then(response => response.json())
        .then(data => console.log(data));
    },
    temperatureConclusion() {
      if (this.exampleCityTimeData.temperatura > 20) {
        this.temperatureConclusionResult = "Sunny";
      } else if (this.exampleCityTimeData.temperatura > 15) {
        this.temperatureConclusionResult = "Cloudy";
      } else {
        this.temperatureConclusionResult = "Cold";
      }
    },
    search() {
      console.log(exampleData);
      this.exampleCityTimeData = exampleData[0];
      console.log(this.exampleCityTimeData);
      this.temperatureConclusion();
    },
  },
  created() {
    // this.fetchData()
  },
}
</script>

<template>
  <main>
    <section class="search-section">
      <h1>Welcome to WeatherHub</h1>
      <p>Get detailed weather and time information</p>
      <p>(NO FUNCIONA POR AHORA)</p>
      <input type="text" placeholder="Search for a city">
      <p>HACER CLICK EN SEARCH PARA HACER LLAMADA A LA API(TODAVÍA NO VIENE DE LA API)</p>
      <button v-on:click="search">Search</button>
      <p v-if="exampleCityTimeData" class="result">Resultados para <span>Cádiz</span></p>
    </section>
    <!-- <h2 v-if="user.inputUsername.length > 0">Hello {{ user.inputUsername }}</h2> -->
    <section class="weather-details">
      <div class="weather-details-left">
        <h1>Weather Details</h1>
        <p>Get detailed weather information for any selected city</p>
        <p>(NO FUNCIONA POR AHORA)</p>
        <button>Compare Locations</button>
      </div>
      <div class="weather-details-right">
        <div class="temperature">
          <h3>Temperature</h3>
          <p>Current temperature in ºC</p>
          <p v-if="exampleCityTimeData"><strong>{{ exampleCityTimeData.temperatura }}ºC</strong></p>
          <p v-if="exampleCityTimeData" class="conclusion">{{ temperatureConclusionResult }}</p>
        </div>
        <div class="humidity">
          <h3>Humidity</h3>
          <p>Current humidity level</p>
          <p v-if="exampleCityTimeData"><strong>{{ exampleCityTimeData.humedad }}%</strong></p>
        </div>
        <div class="wind">
          <h3>Wind Speed</h3>
          <p>Current wind speed in km/h</p>
          <p v-if="exampleCityTimeData"><strong>{{ exampleCityTimeData.viento }}km/h</strong></p>
        </div>
      </div>
    </section>
    <section v-if="!isLogged" class="log-section">
      <SignInForm :sigin="sigin" :userExistMessage="userExistMessage" />
      <LogInForm :login="login" :userNotExistMessage="userNotExistMessage" />
    </section>
    <!-- <button @click="onLogout">Log Out</button> -->
  </main>
</template>

<style scoped lang="scss">
  @import '/src/assets/styles/main.scss';

  main {
    //border: 2px solid black;

    .search-section {
      @include flex(column, center, center);
      //border: 2px solid black;
      width: 100%;
      height: 65vh;
      margin-bottom: 40px;

      h1 {
        font-size: 40px;
        text-align: center;
        margin: 0;
        margin-bottom: 10px;
      }
      p {
        font-size: 20px;
        margin: 0;
        margin-bottom: 20px;
      }
      input {
        padding: 7px 15px 7px 15px;
        border-radius: 8px;
        font-size: 19px;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
        border: 0;
        width: 250px;
      }
      button {
        background-color: rgb(42, 59, 130);
        color: rgb(229, 242, 253);
        padding: 8px 45px 8px 45px;
        font-size: 16px;
        border-radius: 8px;
        border: 0;
        cursor: pointer;
        width: 150px;
      }
      button:hover {
        background-color: rgb(5, 20, 88);
      }
      .result {
        font-size: 30px;
        margin-top: 50px;

        span {
          color: blue;
        }
      }
    }
    
    .weather-details {
      @include flex(row, center, center, 40px);
      border-top: 3px solid rgb(36, 49, 98);
      padding-top: 30px;
      padding-bottom: 20px;

      .weather-details-left {
        //border: 1px solid black;
        width: 30%;
        padding: 15px 15px 15px 15px;
        
        h1 {
          font-size: 35px;
          margin-top: 0;
          margin-bottom: 0;
        }
        
        p {
          margin-top: 10px;
          font-size: 20px;
        }

        button {
          background-color: rgb(42, 59, 130);
          color: rgb(229, 242, 253);
          padding: 10px 15px 10px 15px;
          font-size: 16px;
          border-radius: 8px;
          border: 0;
          cursor: pointer;
          width: 250px;
        }
        button:hover {
          background-color: rgb(5, 20, 88);
        }
      }
      .weather-details-right {
        //border: 1px solid black;
        width: 30%;
        padding: 15px 15px 15px 15px;
        
        .temperature {
          border: 2px solid rgb(142, 142, 187);
          border-radius: 8px;
          padding: 15px 15px 15px 15px;
          margin-bottom: 15px;

          h3 {
            font-size: 22px;
            margin-top: 0;
            margin-bottom: 12px;
          }
          p {
            margin-top: 5px;
            margin-bottom: 5px;
          }

          .conclusion {
            background-color: rgb(162, 177, 243);
            padding: 5px 5px 5px 5px;
            width: 45px;
            text-align: center;
          }
        }
        .humidity {
          border: 2px solid rgb(142, 142, 187);
          border-radius: 8px;
          padding: 15px 15px 15px 15px;
          margin-bottom: 15px;

          h3 {
            font-size: 22px;
            margin-top: 0;
            margin-bottom: 12px;
          }
          p {
            margin-top: 5px;
            margin-bottom: 5px;

          }
        }
        .wind {
          border: 2px solid rgb(142, 142, 187);
          border-radius: 8px;
          padding: 15px 15px 15px 15px;
          margin-bottom: 15px;

          h3 {
            font-size: 22px;
            margin-top: 0;
            margin-bottom: 12px;
          }
          p {
            margin-top: 5px;
            margin-bottom: 5px;

          }
        }
      }
    }

    .log-section {
      @include flex(row, center, baseline);
      //border: 2px solid black;
      border-top: 3px solid rgb(36, 49, 98);
      width: 100%;
      height: 250px;
      padding-top: 70px;
      margin-bottom: 150px;
    }
  }
</style>