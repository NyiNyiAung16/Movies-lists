import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//bootstrap
import "../bootstrap-5.3.2-dist/css/bootstrap.min.css"
import "../bootstrap-5.3.2-dist/js/bootstrap.bundle.min.js"
//custom css
import './assets/app.css'

//pinia
import { createPinia } from 'pinia'
const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app')
