<script>
// import SignInForm from '../childComponents/SignInForm.vue';
// import LogInForm from '../childComponents/LogInForm.vue';
import UserControlForm from '../childComponents/UserControlForm.vue';

import { exampleDataCiudades } from '../../assets/exampleData/tiempoCiudades.js';
import { exampleDataUsuarios } from '../../assets/exampleData/usuarios.js';

export default {
  name: 'HomePage',
  components: {
    // SignInForm,
    // LogInForm,
    UserControlForm,
},
  data() {
    return {
      exampleCityTimeData: null,
      exampleUsersData: null,
      temperatureConclusionResult: String,
    }
  },
  props: {
    isLogged: Boolean,
    user: Object,
  },
  methods: {
    // prueba para obtener los datos de una API de prueba
    async fetchData() {
      fetch('http://localhost/api/ciudades')
        .then(response => response.json())
        .then(data => console.log(data));
    },
    // determina según la temperatura el estado del tiempo
    temperatureConclusion() {
      if (this.exampleCityTimeData[0].tiempoCiudad.temperaturaMin > 20) {
        this.temperatureConclusionResult = "Sunny";
      } else if (this.exampleCityTimeData[0].tiempoCiudad.temperaturaMin > 15) {
        this.temperatureConclusionResult = "Cloudy";
      } else {
        this.temperatureConclusionResult = "Cold";
      }
    },
    // se ejecuta cuando se le da a buscar
    // en el futuro tendrá las funcionalidades correspondientes
    search() {
      this.exampleCityTimeData = exampleDataCiudades.data;
      this.exampleUsersData = exampleDataUsuarios.data;
      this.temperatureConclusion();
      console.log(this.exampleCityTimeData[0]);
    },
  },
  created() {
    // para cuando la API esté lista
    // this.fetchData();
  },
}
</script>

<template>
  <main>
    <section class="search-section">
      <h1>Welcome to WeatherHub</h1>
      <p>Get detailed weather and time information</p>
      <input type="text" placeholder="Search for a city">
      <button v-on:click="search">Search</button>
      <p v-if="exampleCityTimeData" class="result">Resultados para <span>{{ exampleCityTimeData[0].nombreCiudad }}</span></p>
    </section>
    
    <section class="weather-details">
      <div class="weather-details-left">
        <h1>Weather Details</h1>
        <p>Get detailed weather information for any selected city</p>
        <button>Compare Locations</button>
      </div>
      <div class="weather-details-right">
        <div class="temperature">
          <h3>Temperature</h3>
          <p>Current temperature in ºC</p>
          <p v-if="exampleCityTimeData"><strong>{{ exampleCityTimeData[0].tiempoCiudad.temperaturaMax }}ºC - {{ exampleCityTimeData[0].tiempoCiudad.temperaturaMin }}ºC</strong></p>
          <p v-if="exampleCityTimeData" class="conclusion">{{ temperatureConclusionResult }}</p>
        </div>
        <div class="humidity">
          <h3>Humidity</h3>
          <p>Current humidity level</p>
          <p v-if="exampleCityTimeData"><strong>{{ exampleCityTimeData[0].tiempoCiudad.humedad }}%</strong></p>
        </div>
        <div class="wind">
          <h3>Wind Speed</h3>
          <p>Current wind speed in km/h</p>
          <p v-if="exampleCityTimeData"><strong>{{ exampleCityTimeData[0].tiempoCiudad.viento }}km/h</strong></p>
        </div>
        <div class="rain">
          <h3>Rain</h3>
          <p>Probabilities of rain</p>
          <p v-if="exampleCityTimeData"><strong>{{ exampleCityTimeData[0].tiempoCiudad.precipitacion }}%</strong></p>
        </div>
      </div>
    </section>
    <section v-if="exampleCityTimeData" class="city-img-section">
      <div class="city-img-left-side">
        <h2 v-if="exampleCityTimeData"><span>{{ exampleCityTimeData[0].nombreCiudad }}</span></h2>
        <p v-if="exampleCityTimeData">This is an image of the beautiful city {{ exampleCityTimeData[0].nombreCiudad }}</p>
      </div>
      <div class="city-img-right-side">
        <img href="exampleCityTimeData[0].urlImagen" alt="city image">
      </div>
    </section>
    <section v-if="!isLogged" class="log-section">
      <UserControlForm/>
    </section>
  </main>
</template>

<style scoped lang="scss">
  @import '/src/assets/styles/main.scss';

  main {

    .search-section {
      @include flex(column, center, center);
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
        margin-top: 25px;

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
        .rain {
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

    .city-img-section {
      @include flex(row, center, center, 60px);
      border-top: 3px solid rgb(36, 49, 98);
      padding-top: 30px;
      padding-bottom: 20px;

      .city-img-left-side {
        width: 30%;
        padding: 15px 15px 15px 15px;
        
        h2 {
          font-size: 35px;
          margin-top: 0;
          margin-bottom: 0;

          span {
            font-family: 'Lato Black';
            color: rgb(8, 97, 181);
          }
        }
        
        p {
          margin-top: 5px;
          font-size: 20px;
        }
      }
      .city-img-right-side {
        text-align: center;
        width: 30%;
        padding: 15px 15px 15px 15px;
        
        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
      }
    }

    .log-section {
      @include flex(row, center, baseline);
      border-top: 3px solid rgb(36, 49, 98);
      width: 100%;
      height: 250px;
      padding-top: 70px;
      margin-bottom: 150px;
    }
  }
</style>../../assets/exampleData/tiempoCiudades.js