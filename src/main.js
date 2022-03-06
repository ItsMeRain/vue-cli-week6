import { createApp } from 'vue'
import 'bootstrap'
// bootstrap如果不能匯入 npm install @popperjs/core --save
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
