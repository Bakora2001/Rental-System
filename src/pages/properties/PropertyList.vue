<template>
  <div>
    <DashboardHome>
      <router-view/>
      <BaseTable title="Properties"
                 fetchUrl="property"
                 :columns="columns"
                 createRouteName="addProperty">
        <template #otherFilters>
          <div class="flex gap-2 flex-wrap">
            <el-radio-group v-model="paymentStatus" size="large">
              <el-radio-button label="Paid" />
              <el-radio-button label="Unpaid" />
              <el-radio-button label="Overdue" />
            </el-radio-group>

            <ElSelect clearable filterable
                      v-model="selectedTenant"
                      placeholder="Tenants" >
              <ElOption v-for="tenant in tenants"
                        :key="item?.id"
                        :label="item?.first_name"
                        :value="tenant"
              >{{tenant?.first_name}} {{tenant?.last_name}}</ElOption>
              {{selectedTenant}}

<!--              <ElOption>Junior Watua</ElOption>-->
            </ElSelect>

            <ElSelect filterable clearable placeholder="Properties" >
              <ElOption>4d</ElOption>
              <ElOption>3d</ElOption>
            </ElSelect>

            <el-date-picker
                v-model="billingDates"
                type="daterange"
                class="max-w-[250px]"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
            />

            <div class="w-fit flex gap-2 items-center">
              <ElInput placeholder="Amount" class="w-fit"/>
              <ElInput placeholder="Payment Code" class="w-fit"/>
            </div>



          </div>

        </template>

        <template v-slot:bodyCell="slotProps">
          <template v-if="slotProps.column.dataIndex === 'billing_period_start'">
            {{ new Date(slotProps.text).toLocaleDateString() }}
          </template>

          <template v-if="slotProps.column.dataIndex === 'billing_period_end'">
            {{ new Date(slotProps.text).toLocaleDateString() }}
          </template>

          <template v-if="slotProps.column.key === 'amount'">
            {{ slotProps.text?.rent_amount}}
          </template>

          <template v-if="slotProps.column.key === 'tenant'">
            {{ slotProps.text?.tenant?.first_name}} {{ slotProps.text?.tenant?.last_name}}
          </template>

          <template v-if="slotProps.column.dataIndex === 'property'">
            {{ slotProps.text?.name}}
          </template>

          <template v-if="slotProps.column.dataIndex === 'status'">
            <el-tag class=" capitalize"
                    v-if="slotProps?.text === 'unpaid'"
                    type="warning">{{slotProps?.text}}
            </el-tag>

            <el-tag class=" capitalize"
                    v-if="slotProps?.text === 'paid'"
                    type="success">{{slotProps?.text}}
            </el-tag>

            <el-tag class=" capitalize"
                    v-if="slotProps?.text === 'void'"
                    type="success">{{slotProps?.dange}}
            </el-tag>

          </template>

          <template v-if="slotProps.column.key === 'actions'">
            <el-button type="primary">
              <arrow-right class="h-5 w-5"/>
            </el-button>
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
    title: "Property",
    dataIndex: "property",
    key: "property_unit",
    sorter: true,
    width: "20%",
  },
  {
    title: "Start Bill Date",
    dataIndex: "billing_period_start",
  },
  {
    title: "End Bill Date",
    dataIndex: "billing_period_end",
  },
  {
    title: "Actions",
    dataIndex: "",
    key:"actions"
  },

])

const paymentStatus = ref('Paid')
const billingDates = ref()

const selectedTenant = ref()
const tenants = ref([])
const getTenants = ()=>{
  store.dispatch('fetchList', {
    url: 'tenants'
  })
      .then((res)=>{
        tenants.value = res.data?.results
        console.log(res.data?.results)
      })
}

onMounted(()=>{
  getTenants()
})

</script>



<style scoped>

</style>