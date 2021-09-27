import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import scss from '@/assets/scss/main.scss'

const app = createApp(App).use(router)
app.use(router)
app.use(scss)

app.mount('#app')
