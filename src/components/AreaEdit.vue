<template>
    <div class="col s12 m6">
        <div>
        <div class="page-subtitle">
            <h4>Редактировать</h4>
        </div>
        <form @submit.prevent="submitHandler">
            <div class="input-field" >
            <select ref="select" v-model="current">
                <option v-for="a of areas"
                :key="a.id"
                :value="a.id">
                    {{a.name}}
                </option>
            </select>
            <label>Выберите зал</label>
            </div>

            <div class="input-field">
                <input
                    id="newName"
                    type="text"
                    v-model="name"
                    :class="{invalid:v$.name.$silentErrors.length}"
                >
                <label for="newName">Название</label>
                <div v-for="error of v$.name.$silentErrors" :key="error.$uid">
                    <span class="helper-text invalid">
                        Введите название зала
                    </span>
                </div>
            </div>

          <div class="input-field">
            <input
                id="newDescription"
                type="text"
                v-model="description"
            >
            <label for="newDescription">Описание</label>
          </div>

          <div class="input-field">
            <input
                id="work_time"
                type="text"
                v-model="work_time"
            >
            <label for="work_time">Время работы</label>
          </div>

          <div>
            <input
            id="address"
            type="text"
            v-model="address"
            disabled
            >
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
import vSelect from "vue-select";

export default{
    setup() {
        return { 
            v$: useVuelidate() 
        }
    },
    props: {
        areas: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        select: null,
        name: '',
        description: '',
        work_time: '',
        address: '',
        current: null
    }),
    validations() {
        return{
          name: {required}
        }
    },
    watch: {
        current(areaId) {
            const {id, name, description, work_time, address} = this.areas.find(a => a.id === areaId)
            this.current = id
            this.name = name
            this.description = description
            this.work_time = work_time
            this.address = address
        }
    },
    created() {
        const {id, name, description, work_time, address} = this.areas[0]
        this.current = id
        this.name = name
        this.description = description
        this.work_time = work_time
        this.address = address
        console.log(id)
    },
    methods: {
      async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
            try {
                const areaData = {
                    id: this.current,
                    name: this.name,
                    description: this.description,
                    work_time: this.work_time
                }
                console.log(areaData)
                await this.$store.dispatch('updateArea', areaData)
                this.$message('Зал успешно обновлен')
                this.$emit('updated', areaData)

            } catch (e) {console.log(e)}
        },
      async refreshCities(queryString) {
        this.cities = await this.$store.dispatch('getCities', queryString)
      }
    },
      async mounted(){
        M.updateTextFields();
        this.select = M.FormSelect.init(this.$refs.select);
        this.cities = await this.$store.dispatch('getCities', '')

    },
    unmounted() {
        if (this.select && this.select.destroy) {
            this.select.destroy()
        }
    },
    components: {
      vSelect
    }
}
</script>
