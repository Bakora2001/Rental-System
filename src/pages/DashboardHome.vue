<template>
  <div class="w-full h-screen flex flex-col gap-1">
    <TopNav/>
    <div class="w-full min-h-[80vh] flex gap-2">
      <div class="w-fit md:flex flex-col gap-2 hidden">
        <SideBar/>
      </div>

      <div class="w-full ">
        <div class="w-full flex flex-col gap-2 z-50 absolute top-12 bg-gray-500 md:hidden">
          <SideBarMobile/>
        </div>

        <div class="p-4">
          <slot>

          </slot>
        </div>

      </div>
    </div>


  </div>
</template>

<script setup>

import SideBar from "@/components/base/SideBar.vue";
import BaseTable from "@/components/base/BaseTable.vue";
import {ref} from "vue";
import TopNav from "@/components/base/TopNav.vue";
import SideBarMobile from "@/components/base/SideBarMobile.vue";





</script>



<style scoped>

</style>