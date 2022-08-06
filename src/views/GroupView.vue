<template>
  <div>
    <div class="page-title">
      <h3>Эта площадка </h3>
    </div>
    <button
        v-tooltip="'Создать новую группу'"
        class="btn-small btn"
        @click="$router.push('/group/create/' + areaId)"
    > Добавить группу
      <i class="material-icons right">send</i>
    </button>
  </div>

  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Группа</th>
      <th>Категория </th>
      <th>Описание</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(group, idx) of groups" :key="group.id">
      <td>{{idx + 1}}</td>
      <td>{{group.name}} </td>
      <td>{{group.category}} </td>
      <td>{{group.description}}</td>
      <td>
          <span
              :class="[group.typeClass]"
              class="white-text badge"
          >{{group.typeText}}</span>
      </td>
      <td>
        <button
            v-tooltip="'Посмотреть площадку'"
            class="btn-small btn"
            @click="$router.push('/detail/' + group.id)"
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
  name: 'groupsView',
    data() {
    return {
      areaId: this.$route.params.id,
      loading: true,
      updateCount: 0,
      groups: [],
    }
   },
  async mounted() {
    this.groups = await this.$store.dispatch('fetchGroupsAreas', this.areaId)
    this.loading = false
  },
}
</script>
<!--</template>-->
<!--<script>-->
<!--import GroupCreate from "@/components/GroupCreate";-->
<!--import GroupEdit from "@/components/GroupEdit";-->
<!--export default {-->

<!--  name: 'detailView',-->
<!--  data() {-->
<!--    return {-->
<!--      areaId: this.$route.params.id-->
<!--    }-->
<!--  },-->
<!--  components: {GroupCreate, GroupEdit},-->
<!--  async mounted() {-->
<!--    this.groups = await this.$store.dispatch('fetchGroups')-->
<!--    this.loading = false-->
<!--  },-->
<!--  methods:{-->

<!--    updateGroup(group) {-->
<!--      const idx = this.categories.findIndex(g => g.id === group.id)-->
<!--      this.categories[idx].name = group.name-->
<!--      this.updateCount++-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<template>-->
