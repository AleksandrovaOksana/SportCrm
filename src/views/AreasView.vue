<template>
        <div>
    <div class="page-title">
        <h3>Категории</h3>
    </div>
    <section>
        <Loader v-if="loading" />
        <div class="row" v-else>
        <CategoryCreate @created="addNewArea"  />
        <CategoryEdit
            v-if="areas.length"
            :areas="areas"
            :key="areas.length + updateCount"
            @updated="updateArea"
        />
        <p v-else class="center">Залов пока нет</p>
        </div>
    </section>
    </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default{
    name: 'categoriesView',
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
        CategoryCreate, CategoryEdit
    },
    methods:{
      addNewArea(area){
            this.areas.push(area)
        },
      updateArea(area) {
            const idx = this.areas.findIndex(a => a.id === area.id)
            this.areas[idx].name = area.name
            this.description[idx] = description
            this.work_time[idx] = work_time
            this.city[idx] = city
            this.street[idx] = street
            this.house[idx] = house
            this.building[idx] = building
            this.updateCount++
        }
    }
}

</script>
