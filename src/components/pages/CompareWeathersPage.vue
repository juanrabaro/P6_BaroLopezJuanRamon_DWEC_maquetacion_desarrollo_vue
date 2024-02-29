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
          <p>{{ citySearched1.tiempoCiudad.temperaturaMax }} - {{ citySearched1.tiempoCiudad.temperaturaMin }}</p>
          <p>{{ citySearched1.tiempoCiudad.humedad }}</p>
          <p>{{ citySearched1.tiempoCiudad.viento }}</p>
          <p>{{ citySearched1.tiempoCiudad.precipitacion }}</p>
        </div>
        <button @click="revertInputs('input1')">Pick another city</button>
      </div>
      <SearchInput v-show="!showCity2" @searched="city => searchHandle(city, 'input2')" />
      <div v-show="showCity2">
        <div v-if="citySearched2" class="city-card">
          <h2>{{ citySearched2.nombreCiudad }}</h2>
          <p>{{ citySearched2.tiempoCiudad.temperaturaMax }} - {{ citySearched2.tiempoCiudad.temperaturaMin }}</p>
          <p>{{ citySearched2.tiempoCiudad.humedad }}</p>
          <p>{{ citySearched2.tiempoCiudad.viento }}</p>
          <p>{{ citySearched2.tiempoCiudad.precipitacion }}</p>
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
    font-size: 20px;
  }
  
  .search-inputs-container {
    @include flex(row, space-evenly, center);
    padding-top: 70px;
    
    div {
      @include flex(column, center, center);
      width: 100px;
      height: 100px;
      text-align: center;
      
      .city-card {
        @include flex(column, center, center);
        margin-top: 40px;
        height: 300px;
        width: 200px;
        background-color: #292929;
        color: white;
        
        border: 2px solid white;
        border-radius: 3px;
      }
    }
  }
}
</style>