<template>

  <el-menu
      default-active="2"
      class="w-full"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
  >

    <el-menu-item index="2">
      <el-icon><house/></el-icon>
      <template #title>Properties</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><user /></el-icon>
      <template #title>Tenants</template>
    </el-menu-item>
    <!--    <el-menu-item index="4">-->
    <!--      <el-icon><setting /></el-icon>-->
    <!--      <template #title>Setup</template>-->
    <!--    </el-menu-item>-->
    <el-sub-menu index="1">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>Setup</span>
      </template>
      <el-menu-item-group>
        <template #title>
          <span>System</span>
        </template>
        <el-menu-item index="1-1">Company</el-menu-item>
        <el-menu-item index="1-2">Properties</el-menu-item>
        <el-menu-item index="1-3">Units</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group title="Profile">
        <el-menu-item index="1-3">Manager</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, House, User,
} from '@element-plus/icons-vue'


const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>



<style scoped>

</style>