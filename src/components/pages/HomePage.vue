<script>
import UserControlForm from '../childComponents/UserControlForm.vue';
import SearchInput from '../childComponents/SearchInput.vue';

import { exampleDataCiudades } from '../../assets/exampleData/tiempoCiudades.js';
import { exampleDataUsuarios } from '../../assets/exampleData/usuarios.js';

export default {
  name: 'HomePage',
  components: {
    UserControlForm,
    SearchInput,
},
  data() {
    return {
      temperatureConclusionResult: String,
      searchInput: '',
      cityData: null,
      initialLoading: true,
      citySearched: null,
    }
  },
  props: {
    isLogged: Boolean,
    user: Object,
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://localhost/api/ciudades');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        
        this.initialLoading = false;

        const responseData = await response.json();
        this.cityData = responseData.data;

      } catch (error) {
        console.error('Error:', error);
      }
    },
    temperatureConclusion() {
      if (this.citySearched.tiempoCiudad.temperaturaMin > 20) {
        this.temperatureConclusionResult = "Sunny";
      } else if (this.citySearched.tiempoCiudad.temperaturaMin > 15) {
        this.temperatureConclusionResult = "Cloudy";
      } else {
        this.temperatureConclusionResult = "Cold";
      }
    },
    search() {
      const cityNameList = this.cityData.map((city) => {
        return city.nombreCiudad;
      });
      if ( cityNameList.includes(this.searchInput) ) {
        const citySearchedIndex = cityNameList.indexOf(this.searchInput)
        this.citySearched = this.cityData[citySearchedIndex];
        this.temperatureConclusion();
      }
    },
  },
  created() {
    this.fetchData();
  },
}
</script>

<template>
  <main>
    <section class="search-section">
      <h1>Welcome to WeatherHub</h1>
      <p>Get detailed weather and time information</p>
      <SearchInput />
      <p v-if="citySearched" class="result">You searched <span>{{ citySearched.nombreCiudad }}</span></p>
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
          <p v-if="citySearched"><strong>Max: {{ citySearched.tiempoCiudad.temperaturaMax }}ºC - Min: {{ citySearched.tiempoCiudad.temperaturaMin }}ºC</strong></p>
          <p v-if="citySearched" class="conclusion">{{ temperatureConclusionResult }}</p>
        </div>
        <div class="humidity">
          <h3>Humidity</h3>
          <p>Current humidity level</p>
          <p v-if="citySearched"><strong>{{ citySearched.tiempoCiudad.humedad }}%</strong></p>
        </div>
        <div class="wind">
          <h3>Wind Speed</h3>
          <p>Current wind speed in km/h</p>
          <p v-if="citySearched"><strong>{{ citySearched.tiempoCiudad.viento }}km/h</strong></p>
        </div>
        <div class="rain">
          <h3>Rain</h3>
          <p>Probabilities of rain</p>
          <p v-if="citySearched"><strong>{{ citySearched.tiempoCiudad.precipitacion }}%</strong></p>
        </div>
      </div>
    </section>

    <section v-if="citySearched" class="city-img-section">
      <div class="city-img-left-side">
        <h2 v-if="citySearched"><span>{{ citySearched.nombreCiudad }}</span></h2>
        <p v-if="citySearched">This is an image of the beautiful city {{ citySearched.nombreCiudad }}</p>
      </div>
     <div class="city-img-right-side">
        <img :src="citySearched.urlImagen" alt="city image">
      </div>
    </section>

    <section class="more-information-section">
      <div class="more-information-left">
        <h1>More Information</h1>
        <p>Get more information</p>
      </div>
      <div class="more-information-right">
        <div class="population">
          <h3>Population</h3>
          <p>The current amount of people that life in the place</p>
          <p v-if="citySearched"><strong>{{ citySearched.poblacion }}</strong> people life in <strong>{{ citySearched.nombreCiudad }}</strong></p>
        </div>
        <div class="climate">
          <h3>Climate</h3>
          <p>How it is his climate</p>
          <p v-if="citySearched">The climate is <strong>{{ citySearched.clima }}</strong></p>
        </div>
        <div class="terrain">
          <h3>Terrain</h3>
          <p>The land it occupies</p>
          <p v-if="citySearched"><strong>{{ citySearched.terreno }}km<sup>2</sup></strong></p>
        </div>
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

    .more-information-section {
      @include flex(row, center, center, 40px);
      border-top: 3px solid rgb(36, 49, 98);
      padding-top: 30px;
      padding-bottom: 20px;

      .more-information-left {
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
      }
      .more-information-right {
        width: 30%;
        padding: 15px 15px 15px 15px;
        
        .population {
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
        .climate {
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
        .terrain {
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
      padding-bottom: 30px;

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
</style>