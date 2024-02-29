<script>
import axios from 'axios';

import { useLoggedStore } from "../stores/loggedStore"
import { mapState } from "pinia"

export default {
  name: 'SearchHistoryPage',
  data() {
    return {
      loading: true,
      idUserLogged: null,
      userData: null,
      cities: [],
    };
  },
  computed: {
    ...mapState(useLoggedStore, ["userLogged"]),
  },
  methods: {
    logged() {
      if (!this.userLogged.logged) {
        this.$router.push('/');
      }
    },
    getUserData() {
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
          axios.get(`http://localhost:80/api/usuarios/${this.idUserLogged}`, {
            headers: {
              Authorization: `Bearer ${this.userLogged.token}`,
            },
          })
            .then((response) => {
              this.userData = response.data.data
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              console.log(this.userData);
              this.getCities()
            })
        })
    },
    async getCities() {
      var promises = await this.userData.ciudadesGuardadas.map(city => {
        const cityId = city.idCiudad

        return axios.get(`http://localhost:80/api/ciudades/${cityId}`)
          .then((response) => {
            this.cities.unshift(response.data.data)
          })
      });

      await Promise.all(promises)
        .then(() => {
          this.loading = false;
          console.log(this.cities);
        });
    },
  },
  created() {
    this.logged()
    this.getUserData()
  },
}
</script>

<template>
  <main>
    <h1>Search History</h1>
    <h3>Here you can see the history of your searches so easy!</h3>
    <div v-if="loading" class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <ul v-if="!loading" class="searches">
      <li class="city-card" v-for="city in cities" :key="city.id">
        <h2>{{ city.nombreCiudad }}</h2>
        <p>Temp.Max <strong>{{ city.tiempoCiudad.temperaturaMax }}ºC</strong> - Temp.Min <strong>{{ city.tiempoCiudad.temperaturaMin }}ºC</strong></p>
        <p>Humedity <strong>{{ city.tiempoCiudad.humedad }}%</strong></p>
        <p>Wind Speed <strong>{{ city.tiempoCiudad.viento }}km/h</strong></p>
        <p>Rain <strong>{{ city.tiempoCiudad.precipitacion }}%</strong></p>
      </li>
    </ul>
  </main>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/main.scss';

main {
  text-align: center;

  h1 {
    margin-top: 50px;
    margin-bottom: 0;
    font-size: 45px;
    text-align: center;
  }

  h3 {
    text-align: center;
    margin-top: 10px;
  }

  .searches {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    padding-left: 0;
    

    .city-card {
      @include flex(column, center, center);
      margin-bottom: 40px;
      height: 200px;
      width: 300px;
      border: 2px solid inherit;
      background-color: rgb(122, 169, 208);
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      border-radius: 8px;
    
      p {
        margin: 0;
        margin-bottom: 10px;
      }
    }
  }

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(24px, 0);
    }
  }
}
</style>