<template>
  <el-drawer
      v-model="visible"
      :title="title"
      :size="width"
      class="h-screen"
      placement="right"
      :before-close="handleClose"
  >
    <slot class="overflow-scroll"></slot>
    <template #extra>
      <slot name="extra"></slot>
    </template>
    <template #footer>
      <slot class="w-full flex justify-between" name="footer"></slot>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import router from "@/router";

defineProps({
  title: {
    type: String,
    default: "Title",
  },
  width: {
    type: Number,
    default: '50%',
  }
});
const visible = ref(true);
const handleClose = ()=> {
  router.go(-1)
};

onMounted(() => {
  visible.value = true;
});

</script>

<style scoped></style>
