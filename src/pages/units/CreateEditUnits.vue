<template>
  <BaseDrawer :title="routeName">

  </BaseDrawer>
</template>

<script>
import BaseDrawer from "@/components/base/BaseDrawer.vue";

export default {
  name: "CreateEditUnits",
  components: {BaseDrawer},
  data (){
    return {
      routeName: this.$route?.name === 'addUnits' ? 'Add Unit' : 'Edit Unit'
    }
  }
}
</script>



<style scoped>

</style>