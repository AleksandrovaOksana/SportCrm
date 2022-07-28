<template>
        <div>
    <div class="page-title">
        <h3>Площадки</h3>
    </div>
    <section>
        <Loader v-if="loading" />
        <div class="row" v-else>
        <AreaCreate @created="addNewArea"  />
        <AreaEdit
            v-if="areas.length"
            :areas="areas"
            :key="areas.length + updateCount"
            @updated="updateArea"
        />
        <p v-else class="center">Площадок пока нет</p>
        </div>
      <AreasTable :areas="areas" />
    </section>
    </div>
</template>

<script>
import AreaCreate from '@/components/AreaCreate'
import AreaEdit from '@/components/AreaEdit'
import AreasTable from "@/components/AreasTable";
export default{
    name: 'areasView',
    data: () => ({
        areas: [],
        loading: true,
        updateCount: 0
    }),
    async mounted() {
        this.areas = await this.$store.dispatch('fetchAreas')
        this.loading = false
    },
    components: {
      AreasTable,
      AreaCreate, AreaEdit
    },
    methods:{
      addNewArea(area){
            this.areas.push(area)
        },
      updateArea(area) {
            const idx = this.areas.findIndex(a => a.id === area.id)
            this.areas[idx].name = area.name
            this.description[idx] = area.description
            this.work_time[idx] = area.work_time
            this.city[idx] = area.city
            this.street[idx] = area.street
            this.house[idx] = area.house
            this.building[idx] = area.building
            this.updateCount++
        }
    }
}

</script>
