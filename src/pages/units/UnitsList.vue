<template>
  <div>
    <DashboardHome>
      <router-view/>
      <BaseTable title="Houses"
                 fetchUrl="property-unit"
                 :columns="columns"
                 createRouteName="addUnits">
        <template #otherFilters>
          <div class="flex gap-2 flex-wrap">
            <el-radio-group v-model="paymentStatus" size="large">
              <el-radio-button label="vacant" />
              <el-radio-button label="occupied" />
            </el-radio-group>

            <ElSelect clearable filterable placeholder="Tenants" >
              <ElOption>Sam Matheukye</ElOption>
              <ElOption>Junior Watua</ElOption>
            </ElSelect>

            <ElSelect filterable clearable placeholder="House No." >
              <ElOption>4d</ElOption>
              <ElOption>3d</ElOption>
            </ElSelect>



          </div>

        </template>

        <template v-slot:bodyCell="slotProps">
          <template v-if="slotProps.column.dataIndex === 'unit_number'">
            {{ slotProps.text }}
          </template>
          <template v-if="slotProps.column.dataIndex === 'rent_amount'">
            {{ slotProps.text}}
          </template>

          <template v-if="slotProps.column.key === 'tenant'">
            <div v-if="slotProps.text?.length">
              {{slotProps.text}}

            </div>
            <el-tag v-else  class=" capitalize"
                     type="warning">Vacant
            </el-tag>

          </template>

        </template>
      </BaseTable>
    </DashboardHome>
  </div>
</template>

<script setup>
import BaseTable from "@/components/base/BaseTable.vue";
import {onMounted, ref} from "vue";
import DashboardHome from "@/pages/DashboardHome.vue";
import {ArrowRight, CaretRight} from "@element-plus/icons-vue";
import store from "@/store";


const columns = ref([
  {
    title: "House Number",
    dataIndex: "unit_number",
    key: "unit_number",
    sorter: true,
    width: "20%",
  },
  {
    title: "Tenant",
    key: "tenant",
    dataIndex: "tenant",
  },
  {
    title: "Amount",
    key: 'rent_amount',
    dataIndex: "rent_amount"
  },
])

const paymentStatus = ref('Paid')
const billingDates = ref()

const tenants = ref([])
const getTenants = ()=>{
  store.dispatch('fetchList', {
    url: 'tenants'
  })
      .then((res)=>{
        tenants.value = res.data?.results
        console.log(res.data)
      })
}

onMounted(()=>{
  getTenants()
})

</script>



<style scoped>

</style>