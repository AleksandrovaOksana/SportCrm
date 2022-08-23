<template>
  <div id="modal1" class="modal modal_main">
    <div class="modal-content">
      <h4>Создание занятия</h4>
      <p>A bunch of text</p>
      <div class="input-field col s12">
        <select ref="select" v-model="current">
          <optgroup v-for="a of areas"
                    :key="a.id"
                    :value="a.id">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </optgroup>
        </select>
        <label>Optgroups</label>
      </div>

      <input v-model="date" type="text" class="datepicker">
      <input v-model="time" type="text" class="timepicker">
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
</template>
<script>
import M from "materialize-css";
export default {
  data: () => {
    return {
      date: '',
      time: '',
      current: ''
    }
  },
  watch: {
    current(areaId) {
      const {name} = this.areas.find(a => a.id === areaId)
      this.name = name
    }
  },
  async mounted() {
    // eslint-disable-next-line no-async-promise-executor
    let promise = new Promise (async (resolve) => {
    this.areas = await this.$store.dispatch('fetchAreas')
    const {id, name} = this.areas[0]
    this.current = id
    this.name = name
      setTimeout(() => resolve("done"), 1000);
    })
    promise.then(() =>    {

      this.select = M.FormSelect.init(this.$refs.select)
    } )
    console.log(this.areas)

    // const elemsGroups = document.querySelectorAll('select')
  //   const instancesGroups = M.FormSelect.init(elemsGroups, {})
  //
  //   const elemsDataPicker = document.querySelectorAll('.datepicker')
  //   const instancesDataPicker = M.Datepicker.init(elemsDataPicker, {})
  //
  //   const elemsTimePicker = document.querySelectorAll('.timepicker')
  //   const instancesTimePicker = M.Timepicker.init(elemsTimePicker, {})
  //
  //   const elems = document.querySelectorAll('.modal')
  //   const instances = M.Modal.init(elems, {})
   }
}
</script>
<style lang="css">
.modal_main{
  height: 1000px;
  width: 1000px;
}
</style>
