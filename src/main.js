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

const settings = {
    apiKey: '9f333cd7-7ce1-42de-b86d-080d6f25fe71',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
}

const app = createApp(App).use(store).use(router).use(VuelidatePlugin).use(messagePlugin, {}).use(VueAxios, axios)
app.directive('tooltip', tooltip)
app.config.globalProperties.axios=axios
app.use(YmapPlugin, settings)
app.mount('#app')
