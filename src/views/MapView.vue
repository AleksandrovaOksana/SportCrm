<template>
  <div>
    <ul id="tabs-swipe-demo" class="tabs">
      <li class="tab col s3"><a href="#test-swipe-1">Карта</a></li>
      <li class="tab col s3"><a href="#test-swipe-2">Таблица</a></li>
      <li class="tab col s3">
        <router-link to="/areas/edit">Редактирование площадок</router-link>
      </li>
    </ul>
      <div class="mapsPage col s12" id="test-swipe-1">
        <yandex-map
            :zoom="10"
            :coords="coords">
          <ymap-marker
              @click="onClick"
              v-for="a of areas"
              :options="a.id"
              :key="a.id"
              :properties="a"
              marker-id="a.id"
              :coords="a.coords"
              :balloon-template="balloonTemplate"
              @balloonopen="bindListener"
          />

        </yandex-map>
      </div>
      <AreasTable id="test-swipe-2" class="col s12" :areas="areas" />
  </div>

</template>

<script>
import {yandexMap, ymapMarker} from 'vue-yandex-maps'
import AreasTable from "@/components/AreasTable";
import M from 'materialize-css'

export default {
  data: () => ({
    areas: [],
    current: null,
    coords: [56.838317, 60.595040],
  }),
  computed: {
    balloonTemplate() {
      if (this.current) {
        return `
        <div class="col s12 m7">
          <h2 class="header">${this.current.name}</h2>
          <div class="card horizontal">
            <div class="card-stacked">
              <div class="card-content">
                <p>Адрес: ${this.current.address}</p>
                <p>Время работы: ${this.current.work_time}</p>
              </div>
              <div class="card-action">
                <button class="btn waves-effect waves-light" type="button" name="action" id="link">Подробнее
                  <i class="material-icons right">send</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `
      } else {
        return ''
      }

    }
  },
  async mounted() {
    this.areas = await this.$store.dispatch('fetchAreas')
    M.Tabs.init(document.querySelector("#tabs-swipe-demo"));
  },
  methods: {
    onClick(e) {
      this.current = e.get('target').properties._data
    },
    bindListener() {
      document.getElementById('link').addEventListener('click', this.toDetail);
    },
    toDetail() {
      this.$router.push('/detail/' + this.current.id)
    }
  },
  components: {yandexMap, ymapMarker, AreasTable}
}
</script>
<style>
.ymap-container {
  height: 100%;
}

.mapsPage {
  height: 70vh;
  width: 70vw;
}
.header {
  font-size: 1.5rem;
}
</style>
