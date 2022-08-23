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
                        Введите название группы
                    </span>
          </div>
        </div>

        <div class="input-field" >

          <select ref="select" v-model="current">
            <option v-for="c of categories"
                    :key="c.id"
                    :value="c.id">
              {{c.name}}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
              id="description"
              type="text"
              v-model="description"
          >
          <label for="name">Описание</label>
          <div>
                    <span class="helper-text">
                        Введите описание группы
                    </span>
          </div>
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
import {required} from '@vuelidate/validators'
import M from 'materialize-css'
export default{

  props: {
    areaId: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      name:'',
      catName:'',
      description: '',
      select: null,
      current: null,
      categories: []
    }
  },

  watch: {
    current(catId) {
      if(this.categories.length){
        const {name} = this.categories.find(c => c.id === catId)
        this.catName = name
      }

    }
  },
  async created() {
    // eslint-disable-next-line no-async-promise-executor
    let promise = new Promise(async (resolve) => {
      // эта функция выполнится автоматически, при вызове new Promise
      this.categories = await this.$store.dispatch('fetchCategories')
      const {id, name} = this.categories[0]
      this.current = id
      this.catName = name
      // через 1 секунду сигнализировать, что задача выполнена с результатом "done"
      setTimeout(() => resolve("done"), 1000);
    });

    promise.then(() =>    {

      this.select = M.FormSelect.init(this.$refs.select)
    } )
    console.log(this.categories)


  },
  validations() {
    return{
      name: {required}
    }
  },
  async mounted(){
    // eslint-disable-next-line no-undef
    M.updateTextFields();
    // this.select = M.FormSelect.init(this.$refs.select)
    // eslint-disable-next-line no-undef


  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async submitHandler(){
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        console.log(this.areaId)
        const data = {
          name: this.name,
          category_id: this.current,
          description: this.description,
          area_id: this.areaId
        }
        const group = await this.$store.dispatch('createGroup', data)
        this.name = ''
        this.category = ''
        this.description = ''
        this.area = ''
        this.v$.$reset()
        this.$message(`Группа ${group.name} создана`)
        this.$emit('created', group)
      } catch(e) {console.log(e)}
    }}
}
</script>
