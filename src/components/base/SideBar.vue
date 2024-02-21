<template>

  <div class="w-full flex items-center justify-start px-6 py-2">
    <icon-menu
        @click="isCollapse = !isCollapse"
        class="w-6 h-6 cursor-pointer text-gray-600 hover:text-blue-500"/>
  </div>

  <el-menu
    :router="true"
      default-active="invoices"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
  >

    <el-menu-item index="invoices">
      <el-icon><DocumentChecked/></el-icon>
      <template #title>Invoices</template>
    </el-menu-item>
    <el-menu-item index="houses">
      <el-icon><house/></el-icon>
      <template #title>Houses</template>
    </el-menu-item>
    <el-menu-item index="properties">
      <el-icon><OfficeBuilding/></el-icon>
      <template #title>Properties</template>
    </el-menu-item>
    <el-menu-item index="tenants">
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
  OfficeBuilding,
  Setting, House, User,DocumentChecked
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>