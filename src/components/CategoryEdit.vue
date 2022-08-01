<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="submitHandler">
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
              id="name"
              type="text"
              v-model="name"
              :class="{invalid:v$.name.$silentErrors.length}"
          >
          <label for="name">Название</label>
          <div v-for="error of v$.name.$silentErrors" :key="error.$uid">
                    <span class="helper-text invalid">
                        Введите название категории
                    </span>
          </div>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import {required} from '@vuelidate/validators'
export default{
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    name:'',
    current: null
  }),
  validations() {
    return{
      name: {required}
    }
  },
  watch: {
    current(catId) {
      const {name} = this.categories.find(c => c.id === catId)
      this.name = name
    }
  },
  created() {
    const {id, name} = this.categories[0]
    this.current = id
    this.name = name
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          name: this.name
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория успешно обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {console.log(e)}
    }
  },
  mounted(){
    // eslint-disable-next-line no-undef
    M.updateTextFields();
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select);
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
