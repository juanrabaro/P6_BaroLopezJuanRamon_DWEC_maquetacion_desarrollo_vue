import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './components/router/router'
import store from './components/globalUser/store'

createApp(App).use(router).mount('#app')
