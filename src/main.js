import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from "primevue/config";
import 'primevue/resources/themes/aura-light-blue/theme.css';
import ToastService from 'primevue/toastservice';

import router from "./router/index.js";

createApp(App)
    .use(router)
    .use(PrimeVue)
    .use(ToastService)
    .mount('#app')
