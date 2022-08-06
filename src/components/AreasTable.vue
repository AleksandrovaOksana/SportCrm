<template>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Площадка</th>
        <th>Описание</th>
        <th>Время работы</th>
        <th>Адрес</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(area, idx) of areas" :key="area.id">
        <td>{{idx + 1}}</td>
        <td>{{area.name}} </td>
        <td>{{area.description}} </td>
        <td>{{area.work_time}}</td>
        <td>{{area.address}}</td>
        <td>
          <span 
          :class="[area.typeClass]"
          class="white-text badge"
          >{{area.typeText}}</span>
        </td>
        <td>
          <button 
          v-tooltip="'Посмотреть группы'"
          class="btn-small btn" 
          @click="$router.push('/group/' + area.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
</template>

<script>
export default {
    props: {
        areas: {
            required: true,
            type: Array
        }
    },

}
</script>
