<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="name"
              :class="{invalid:v$.name.$silentErrors.length}"
          >
          <label for="name">Название</label>
          <div v-for="error of v$.name.$silentErrors" :key="error.$uid">
                    <span class="helper-text invalid">
                        Введите название зала
                    </span>
          </div>
        </div>

        <div class="input-field">
          <input
              id="description"
              type="text"
              v-model="description"
          >
          <label for="description">Описание</label>
        </div>

        <div class="input-field">
          <input
              id="work_time"
              type="text"
              v-model="work_time"
          >
          <label for="work_time">Время работы</label>
        </div>



          <vSelect  id="city"
                    type="text"
                    v-model="city"
                    :class="{invalid:v$.city.$silentErrors.length}"
                    :options="cities" label="name" :reduce="name => name.id"
                    @search="refreshCities">
            </vSelect>
          <label for="city">Город</label>
          <div v-for="error of v$.city.$silentErrors" :key="error.$uid">
                    <span class="helper-text invalid">
                        Выберите город
                    </span>
        </div>
        <div class="input-field">
          <input
              id="street"
              type="text"
              v-model="street"
              :class="{invalid:v$.street.$silentErrors.length}"
          >
          <label for="street">Улица</label>
          <div v-for="error of v$.street.$silentErrors" :key="error.$uid">
                    <span class="helper-text invalid">
                        Введите название улицы
                    </span>
          </div>
        </div>

        <div class="input-field">
          <input
              id="house"
              type="number"
              v-model.number="house"
              :class="{invalid:v$.house.$silentErrors.length}"
          >
          <label for="house">Дом</label>
          <div v-for="error of v$.house.$silentErrors" :key="error.$uid">
                    <span class="helper-text invalid">
                        Укажите номер дома
                    </span>
          </div>
        </div>

        <div class="input-field">
          <input
              id="building"
              type="text"
              v-model.number="building"
          >
          <label for="building">Корпус/Литерал</label>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {minValue, required} from '@vuelidate/validators'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
export default {
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      name: '',
      description: '',
      work_time: '',
      city: '',
      street: '',
      house: 1,
      building: '',
      cities: [],
      options: [{country: 'Canada', code: 'CA'}]
    }
  },
  validations() {
    return {
      name: {required},
      city: {required},
      street: {required},
      house: {minValue: minValue(1)}
    }
  },
  async mounted() {
    // eslint-disable-next-line no-undef
    M.updateTextFields();
    this.cities = await this.$store.dispatch('getCities', '')

  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        const area = await this.$store.dispatch('createArea', {
          name: this.name,
          description: this.description,
          work_time: this.work_time,
          city: this.city,
          street: this.street,
          house: this.house,
          building: this.building
        })
        this.name = ''
        this.description = ''
        this.work_time = ''
        this.city = ''
        this.street = ''
        this.house = 1
        this.building = ''
        this.v$.$reset()
        this.$message(`Площадка ${area.name} создана`)
        this.$emit('created', area)
      } catch (e) {
        console.log(e)
      }
    },
    async refreshCities(queryString) {
      this.cities = await this.$store.dispatch('getCities', queryString)
    }
  },
  components: {
    vSelect
  },
}
</script>
