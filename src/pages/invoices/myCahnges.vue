<template>
  <div>
    <DashboardHome>
      <router-view/>
      <BaseTable title="Invoices"
                 fetchUrl="invoice"
                 :columns="columns">
        <template #primaryAction>
          <el-button type="primary" @click="generateInvoices">
            Genarate Invoices
          </el-button>
        </template>

        <template #otherFilters>
          <div class="flex gap-2 flex-wrap">
            <el-radio-group v-model="paymentStatus" size="large">
              <el-radio-button label="Paid" />
              <el-radio-button label="Unpaid" />
              <el-radio-button label="Overdue" />
            </el-radio-group>

            <ElSelect clearable filterable placeholder="Tenants" >
              <ElOption>Sam Matheukye</ElOption>
              <ElOption>Junior Watua</ElOption>
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
          <template v-if="slotProps.column.key === 'property_unit'">
            {{ slotProps.text.tenant_unit.property_unit.unit_number}}
          </template>
          <template v-if="slotProps.column.dataIndex === 'billing_period_start'">
            {{ new Date(slotProps.text).toLocaleDateString() }}
          </template>

          <template v-if="slotProps.column.dataIndex === 'billing_period_end'">
            {{ new Date(slotProps.text).toLocaleDateString() }}
          </template>

          <template v-if="slotProps.column.key === 'rent_amount'">
            <template v-for="item in slotProps.text.invoice_utilities ">
              <p v-if="item.type=='rent'">{{(item.amount)?.toLocaleString()}}</p>
            </template>
          </template>

          <template v-if="slotProps.column.key === 'water_amount'">
            <p v-if="!(slotProps.text.invoice_utilities.filter(x=> x.type==='water')).length">
              0
            </p>
            <p v-else>
              {{(slotProps.text.invoice_utilities.filter(x=> x.type==='water')[0]?.amount)?.toLocaleString()}}
            </p>
          </template>

          <template v-if="slotProps.column.key === 'service_charge_amount'">
            <p v-if="!(slotProps.text.invoice_utilities.filter(x=> x.type==='service_charge')).length">
              0
            </p>
            <p v-else>
              {{(slotProps.text.invoice_utilities.filter(x=> x.type==='service_charge')[0]?.amount)?.toLocaleString()}}
            </p>
          </template>

          <template v-if="slotProps.column.key === 'transaction_code'">
            <p v-for="i in slotProps.text.invoice_transactions">
              {{i.transaction_code}}
            </p>
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
                    type="success">{{ slotProps?.text }}
            </el-tag>

            <el-tag class=" capitalize"
                    v-if="slotProps?.text === 'void'"
                    type="success">{{ slotProps?.dange }}
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
import BaseTable from "@/components/base/BaseTable.vue"
import { onMounted, ref } from "vue"
import DashboardHome from "@/pages/DashboardHome.vue"
import { ArrowRight, CaretRight } from "@element-plus/icons-vue"
import store from "@/store"

const columns = ref([
  {
    title: "Property",
    dataIndex: "",
    key: "property_unit",
    sorter: true,
    width: "20%"
  },
  {
    title: "Rent Amount",
    key: "rent_amount",
    dataIndex: ""
  },
  {
    title: "Water",
    key: "water_amount",
    dataIndex: ""
  },
  {
    title: "Service Charge",
    key: "service_charge_amount",
    dataIndex: ""
  }, {
    title: "Transaction Code",
    key: "transaction_code",
    dataIndex: ""
  },
  {
    title: "Status",
    dataIndex: "status"
  },
  {
    title: "Start Bill Date",
    dataIndex: "billing_period_start"
  },
  {
    title: "End Bill Date",
    dataIndex: "billing_period_end"
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions"
  }
])

const paymentStatus = ref("Paid")
const billingDates = ref()
const loadingGenerateInvoices = ref(false)

const tenants = ref([])
const getTenants = (params = []) => {
  let myParams = {}

  params.map(query => {
    Object.assign(myParams, query)
  })

  store.dispatch("fetchList", {
    url: "tenants",
    params: myParams
  })
      .then((res) => {
        tenants.value = res.data?.results
        console.log(res.data)
      })
}

const generateInvoices = () => {
  loadingGenerateInvoices.value = true
  store.dispatch("postData", {
    url: "invoice/generate-invoices",
    payload: {}
  })
      .then((res) => {
        loadingGenerateInvoices.value = false
        tenants.value = res.data?.results
        console.log(res.data)
      }).catch(() => {
    loadingGenerateInvoices.value = false
  })
}

onMounted(() => {
  getTenants([{ tenant: 1 }, { name: "same" }])
})

</script>


<style scoped>

</style>