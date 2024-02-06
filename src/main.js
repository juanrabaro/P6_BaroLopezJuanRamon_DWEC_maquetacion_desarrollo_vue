import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './components/router/router'
import store from './components/globalUser/store'

createApp(App).use(store).use(router).mount('#app')
