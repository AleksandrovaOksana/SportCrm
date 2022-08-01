<template>
  <div>
    <div class="page-title">
      <h3>Эта площадка</h3>
    </div>
    <GroupCreate :areaId = "areaId"/>
  </div>
</template>
<script>
import GroupCreate from "@/components/GroupCreate";
export default {

  name: 'detailView',
  data() {
    return {
      areaId: this.$route.params.id
    }
  },
  components: {GroupCreate}
}
</script>
