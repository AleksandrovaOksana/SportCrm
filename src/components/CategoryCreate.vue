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
                        Введите название категории
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
export default{
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      name:''
    }
  },
  validations() {
    return{
      name: {required}
    }
  },
  mounted(){
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
  methods: {
    async submitHandler(){
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          name: this.name
        })
        this.name = ''
        this.v$.$reset()
        this.$message(`Категория ${category.name} создана`)
        this.$emit('created', category)
      } catch(e) {console.log(e)}
    }}
}
</script>
