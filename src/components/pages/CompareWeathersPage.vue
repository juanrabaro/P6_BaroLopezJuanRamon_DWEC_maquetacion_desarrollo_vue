<script>
import SearchInput from '../childComponents/SearchInput.vue';

export default {
  name: 'CompareWeathersPage',
  data() {
    return {
      citySearched1: null,
      citySearched2: null,
      showCity1: false,
      showCity2: false,
    }
  },
  components: {
    SearchInput
  },
  methods: {
    searchHandle(citySearched, inputId) {
      if (inputId === 'input1') {
        this.citySearched1 = citySearched;
        this.showCity1 = true;
      } else if (inputId === 'input2') {
        this.citySearched2 = citySearched;
        this.showCity2 = true;
      }
    },
    revertInputs(inputId) {
      inputId === 'input1' ? this.showCity1 = false : this.showCity2 = false;
    }
  }
}
</script>

<template>
  <main>
    <h1>Compare Weathers</h1>
    <h3>Search two cities to compare their time</h3>
    <section class="search-inputs-container">
      <SearchInput v-show="!showCity1" @searched="city => searchHandle(city, 'input1')" />
      <div v-show="showCity1">
        <div v-if="citySearched1" class="city-card">
          <h2>{{ citySearched1.nombreCiudad }}</h2>
          <p>Temp.Max <strong>{{ citySearched1.tiempoCiudad.temperaturaMax }}ºC</strong> - Temp.Min <strong>{{ citySearched1.tiempoCiudad.temperaturaMin }}ºC</strong></p>
          <p>Humedity <strong>{{ citySearched1.tiempoCiudad.humedad }}%</strong></p>
          <p>Wind Speed <strong>{{ citySearched1.tiempoCiudad.viento }}km/h</strong></p>
          <p>Rain <strong>{{ citySearched1.tiempoCiudad.precipitacion }}%</strong></p>
        </div>
        <button @click="revertInputs('input1')">Pick another city</button>
      </div>
      <SearchInput v-show="!showCity2" @searched="city => searchHandle(city, 'input2')" />
      <div v-show="showCity2">
        <div v-if="citySearched2" class="city-card">
          <h2>{{ citySearched2.nombreCiudad }}</h2>
          <p>Temp.Max <strong>{{ citySearched2.tiempoCiudad.temperaturaMax }}ºC</strong> - Temp.Min <strong>{{ citySearched2.tiempoCiudad.temperaturaMin }}ºC</strong></p>
          <p>Humedity <strong>{{ citySearched2.tiempoCiudad.humedad }}%</strong></p>
          <p>Wind Speed <strong>{{ citySearched2.tiempoCiudad.viento }}km/h</strong></p>
          <p>Rain <strong>{{ citySearched2.tiempoCiudad.precipitacion }}%</strong></p>
        </div>
        <button @click="revertInputs('input2')">Pick another city</button>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/main.scss';

main {
  h1 {
    margin: 0;
    margin-top: 80px;
    text-align: center;
    font-size: 43px;
  }
  h3 {
    text-align: center;
    margin: 0;
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 20px;
  }
  
  .search-inputs-container {
    @include flex(row, space-evenly, center);
    padding-top: 70px;
    padding-bottom: 160px;
    
    div {
      @include flex(column, center, center);
      width: 100px;
      height: 100px;
      text-align: center;
      
      .city-card {
        @include flex(column, center, center);
        margin-top: 40px;
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

      button {
        margin-top: 10px;
        padding: 10px 20px;
        background-color: rgb(42, 59, 130);
        color: white;
        font-size: 17px;
        border: 0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
        width: 150px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        
        &:hover {
          background-color: rgb(5, 20, 88);
        }
      }
    }
  }
}

@media (max-width: 815px) {
  main .search-inputs-container {
    flex-direction: column;
    gap: 170px;
  }
}
</style>