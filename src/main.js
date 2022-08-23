import {createApp} from 'vue'
import { VuelidatePlugin } from '@vuelidate/core'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import messagePlugin from './utils/message.plugin'
import {tooltip} from '@/directives/tooltip.directive'
import 'materialize-css/dist/js/materialize.min'
import YmapPlugin from 'vue-yandex-maps'
import 'v-calendar/dist/style.css'
import VCalendar from 'v-calendar'

const settings = {
    apiKey: process.env.VUE_APP_YANDEX_API_KEY,
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
}

const app = createApp(App).use(store).use(router).use(VuelidatePlugin).use(messagePlugin, {}).use(VueAxios, axios)
app.directive('tooltip', tooltip)
app.config.globalProperties.axios=axios
app.use(YmapPlugin, settings)
app.use(VCalendar, {})
app.mount('#app')
