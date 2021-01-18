import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

createApp(App).use(router).mount('#app')
