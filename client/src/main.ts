import './assets/main.css'
import './assets/image.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//primevue
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'

//prime flex
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.mount('#app')
