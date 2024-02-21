<template>
  <div class="w-full h-12 bg-[#00afe1] flex justify-between px-6 items-center">
    <div class="flex items-center gap-2 text-white">
<!--      <h3 class="font-bold  text-2xl">Keja Pro</h3>-->
      <h3 class="font-bold  text-2xl">Maxi Rental</h3>
      <home-filled class="h-6 w-6"/>
    </div>

    <div class="flex items-center gap-2">
      <el-popover
          placement="top"
          :width="200"
          trigger="click"
      >
        <template #default>
          <el-button @click="signOut" >Sign Out</el-button>
        </template>
        <template #reference>
          <el-avatar :icon="UserFilled" class="cursor-pointer"/>
        </template>
      </el-popover>



    </div>
  </div>
</template>


<script setup>

import {HomeFilled, UserFilled,Menu as IconMenu} from "@element-plus/icons-vue";
import {ElNotification} from "element-plus";
import router from "@/router";

const signOut= ()=>{
  localStorage.removeItem('authData');
  ElNotification({
    title: 'Success',
    type: 'success',
    position: 'top-right',
    message: 'Logged Out',
  });
  router.push({ name: 'login' });
}
</script>


<style scoped>

</style>