<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="submitHandler">
        <div class="input-field" >

          <select ref="select" v-model="currentGroup">
            <option v-for="g of groups"
                    :key="g.id"
                    :value="g.id">
              {{g.name}}
            </option>
          </select>
          <label>Выберите группу</label>
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
    groups: {
      type: Array,
      required: true
    },
    areaId: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    select: null,
    name:'',
    current: null,
    currentGroup: null,
    catName:'',
    description: '',
    categories: []
  }),
  validations() {
    return{
      name: {required}
    }
  },
  watch: {
    current(catId) {
      if(this.categories.length){
        const {name} = this.categories.find(c => c.id === catId)
        this.catName = name
      }

    },
    currentGroup(groupId) {
      if(this.categories.length){
        const {name} = this.categories.find(g => g.id === groupId)
        this.groupName = name
      }

    }
  },
  async created() {
    const {id, name, description, category_id, areaID} = this.groups[0]
    this.currentGroup = id
    this.name = name
    this.description = description
    this.category_id = category_id
    this.areaID = areaID

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
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        const groupData = {
          id: this.current,
          name: this.name,
          description: this.description,
          category: this.category,
          area_id: this.areaId
        }
        await this.$store.dispatch('updateGroup', groupData)
        this.$message('Группа успешно обновлена')
        this.$emit('updated', groupData)
      } catch (e) {console.log(e)}
    }
  },
  mounted(){
    // eslint-disable-next-line no-undef
    M.updateTextFields();
    // // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select);
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
