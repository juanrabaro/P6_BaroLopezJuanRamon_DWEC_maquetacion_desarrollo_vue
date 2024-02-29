<script>
import axios from 'axios';

import UserControlForm from '../childComponents/UserControlForm.vue';
import SearchInput from '../childComponents/SearchInput.vue';

import { useLoggedStore } from "../stores/loggedStore"
import { mapState } from "pinia"

export default {
  name: 'HomePage',
  components: {
    UserControlForm,
    SearchInput,
  },
  data() {
    return {
      temperatureConclusionResult: String,
      citySearched: null,
      idUserLogged: null,
      citySaved: false,
      enableMoreInfo: false,
    }
  },
  computed: {
    ...mapState(useLoggedStore, ["userLogged"]),
  },
  methods: {
    handleSearched(citySearched) {
      this.citySaved = false;
      this.citySearched = citySearched;
      this.enableMoreInfo = true;
      this.temperatureConclusion();
      document.getElementById("weather").scrollIntoView({ behavior: 'smooth' });

      axios.get('http://localhost:80/api/usuarioData', {
        headers: {
          Authorization: `Bearer ${this.userLogged.token}`,
        },
      })
        .then((response) => {
          this.idUserLogged = response.data.id
          console.log(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          axios.post('http://localhost:80/api/guardar-ciudad', {
            ciudad_id: this.citySearched.id,
            usuario_id: this.idUserLogged,
          }, {
            headers: {
              Authorization: `Bearer ${this.userLogged.token}`,
            }
          })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error('Error:', error);
            })
            .finally(() => {
              console.log("ciudad guardada si user logged");
              if (this.userLogged.logged) {
                this.citySaved = true;
              }
            });
        })
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
    moreInfo() {
      if ( this.enableMoreInfo ) {
        document.getElementById("cityImgSection").scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
}
</script>

<template>
  <main>
    <section class="search-section">
      <h1>Welcome to WeatherHub</h1>
      <p>Get detailed weather and time information</p>
      <SearchInput @searched="handleSearched" />
      <p v-if="citySearched" class="result">You searched <span>{{ citySearched.nombreCiudad }}</span></p>
    </section>

    <section class="weather-details" id="weather">
      <div class="weather-details-left">
        <h1>Weather Details</h1>
        <p>Get detailed weather information for any selected city</p>
        <button @click="() => this.$router.push('/compare-weathers')">Compare Locations</button>
      </div>
      <div class="weather-details-right">
        <div class="temperature">
          <h3>Temperature</h3>
          <p>Current temperature in ºC</p>
          <p v-if="citySearched"><strong>Max: {{ citySearched.tiempoCiudad.temperaturaMax }}ºC - Min: {{
            citySearched.tiempoCiudad.temperaturaMin }}ºC</strong></p>
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

    <button v-if="enableMoreInfo" @click="moreInfo" class="more-info">more info ⬇</button>

    <section v-if="citySearched" class="city-img-section" id="cityImgSection">
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
          <p v-if="citySearched"><strong>{{ citySearched.poblacion }}</strong> people life in <strong>{{
            citySearched.nombreCiudad }}</strong></p>
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

    <section v-if="!userLogged.logged" class="log-section">
      <UserControlForm />
    </section>

    <transition name="disappear">
      <p v-if="citySaved" class="city-saved">City saved!</p>
    </transition>
  </main>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/main.scss';

main {
  .city-saved {
    position: fixed;
    bottom: 70px;
    right: 0;
    background-color: rgb(8, 181, 80);
    color: rgb(229, 242, 253);
    padding: 15px 35px 15px 35px;
    margin-bottom: 0;
    font-size: 20px;
  }

  .search-section {
    @include flex(column, center, center);
    width: 100%;
    height: 63vh;
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

  .more-info {
    text-align: center;
    background-color: royalblue;
    margin: 0;
    border: 0;
    border-top: 3px solid rgb(36, 49, 98);
    width: 100%;
    color: rgb(222, 233, 255);
    font-size: 30px;
    padding-top: 15px;
    padding-bottom: 15px;
    cursor: pointer;
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
}</style>