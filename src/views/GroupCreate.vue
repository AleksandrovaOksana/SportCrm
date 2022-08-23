<template>
  <GroupCreate :areaId="areaId"/>
</template>
<script>
import GroupCreate from "@/components/GroupCreate";
export default {
  name: 'groupCreate',
  data() {
    console.log(this.$route)
    return {
      areaId: this.$route.params.id
    }
  },
  components: {GroupCreate}
}
</script>
