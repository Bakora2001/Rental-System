<template>
  <div>
    <DashboardHome>
      <router-view/>
      <BaseTable title="Invoices"
                 fetchUrl="invoice"
                 :searchTerms="searchTerms"
                 :columns="columns">
        <template #primaryAction>
          <el-button type="primary" @click="generateInvoices">
            Genarate Invoices
          </el-button>
        </template>

        <template #otherFilters>
          <div class="flex gap-2 flex-wrap">
            <el-radio-group v-model="paymentStatus" size="large" @change="filterByPaymentStatus">
              <el-radio-button label="">
                <template #default>All</template>
              </el-radio-button>
              <el-radio-button label="paid" name="paid" />
              <el-radio-button label="unpaid" name="unpaid" />
              <el-radio-button label="void" name="void" />
            </el-radio-group>

            <ElSelect clearable filterable
                      v-model="selectTenant"
                      @change="filterByTenant"
                      @focus="getTenants([])"
                      placeholder="Tenants" >

              <ElOption v-for="tenant in tenants"
                        :key="tenant.value"
                        :label="tenant.label"
                      :value="tenant.value"/>
            </ElSelect>

            <ElSelect clearable
                      filterable
                      v-model="selectProperty"
                      @change="filterByProperty"
                      @focus="getProperties([])"
                      placeholder="Properties" >

              <ElOption v-for="tenant in properties"
                        :key="tenant.value"
                        :label="tenant.label"
                      :value="tenant.value"/>
            </ElSelect>


            <el-date-picker
                v-model="billingDateStart"
                type="date"
                placeholder="Sart Bill Date"
                class="max-w-[250px]"
                @change="filterByBeginDate"
                clearable
            />
            <el-date-picker
                v-model="billingDateEnd"
                clearable
                placeholder="End Bill Date"
                type="date"
                class="max-w-[250px]"
                @change="filterByEndDate"
            />
          </div>
        </template>

        <template v-slot:bodyCell="slotProps">
          <template v-if="slotProps.column.key === 'property_unit'">
            {{ slotProps.text?.tenant_unit?.property_unit}}
          </template>
          <template v-if="slotProps.column.key === 'tenant'">
            {{ slotProps.text?.tenant_name}}
          </template>
          <template v-if="slotProps.column.dataIndex === 'billing_period_start'">
            {{ new Date(slotProps.text).toLocaleDateString() }}
          </template>

          <template v-if="slotProps.column.dataIndex === 'billing_period_end'">
            {{ new Date(slotProps.text).toLocaleDateString() }}
          </template>

          <template v-if="slotProps.column.key === 'rent_amount'">
            <template v-for="item in slotProps.text.invoice_utilities ">
              <p v-if="item.type === 'rent'">{{(item.amount)?.toLocaleString()}}</p>
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

          <template v-if="slotProps.column.key === 'property'">
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

            <el-button type="primary"
                       @click="getInvoices(slotProps.text?.id,slotProps.text?.account_number,
                       slotProps.text?.total_billed_amount)">
              <arrow-right class="h-5 w-5"/>
            </el-button>

            <el-drawer
                v-model="drawer"
                title="Invoice Title"
                direction="rtl"
                :before-close="handleClose"
            >
              {{slotProps?.text?.id}}
              <el-form>
                <el-form-item>
                  <el-input-number
                      disabled
                      v-model="transactionObject"
                                   :value="slotProps?.text?.id" />
                </el-form-item>
              </el-form>
            </el-drawer>
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
import {ElMessageBox} from "element-plus";
import router from "@/router";


const columns = ref([
  {
    title: "Unit Number",
    dataIndex: "",
    key: "property_unit",
    sorter: true,
  },
  {
    title: "Tenant",
    key: "tenant",
    dataIndex: "tenant_unit",
  },
  {
    title: "Rent Amount",
    key: 'rent_amount',
    dataIndex: ""
  },
  {
    title: "Water",
    key: 'water_amount',
    dataIndex: ""
  },
  {
    title: "Service Charge",
    key: 'service_charge_amount',
    dataIndex: ""
  }, {
    title: "Transaction Code",
    key: 'transaction_code',
    dataIndex: ""
  },
  {
    title: "Status",
    dataIndex: "status",
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

const paymentStatus = ref("")
const selectTenant = ref()
const selectProperty = ref()
const billingDateStart = ref()
const billingDateEnd = ref()

const searchTerms = ref([
  {status:""},
  {tenant_unit__tenant: ''},
  {property: ''},
  {billing_period_end__gte: ''},
  {billing_period_start__gte: ''},
])



const tenants = ref([])

const properties = ref([])

const drawer = ref(false)

const handleClose = (done) => {
  ElMessageBox.confirm('Are you sure you want to close this?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}

const filterByPaymentStatus = ()=>{
  // searchTerms.value.push({status : paymentStatus.value} )
  let searchKey = "status"
  let foundObject = searchTerms.value.find(item => item[searchKey] !== undefined && item[searchKey] !== null);
  if (foundObject) {
    if (paymentStatus.value === 'all') {
      foundObject[searchKey] = "";
    }else {
      foundObject[searchKey] = paymentStatus.value;
    }
  }

}

const filterByTenant = ()=>{
  // searchTerms.value.push({status : paymentStatus.value} )
  let searchKey = "tenant_unit__tenant"
  let foundObject = searchTerms.value.find(item => item[searchKey] !== undefined && item[searchKey] !== null);
  console.log('altering',foundObject,selectTenant.value)


  if (foundObject) {
    foundObject[searchKey] = selectTenant.value;
  }

}

const filterByProperty = ()=>{
  let searchKey = "property"
  let foundObject = searchTerms.value.find(item => item[searchKey] !== undefined && item[searchKey] !== null);

  if (foundObject) {
    foundObject[searchKey] = selectProperty.value;
  }
}

const filterByBeginDate = ()=>{
  let searchKey = "billing_period_start__gte"
  let foundObject = searchTerms.value.find(item => item[searchKey] !== undefined && item[searchKey] !== null);

  if (foundObject) {
    foundObject[searchKey] = new Date(billingDateStart.value).toLocaleDateString();
  }
}
const filterByEndDate = ()=>{
  let searchKey = "billing_period_end__gte"
  let foundObject = searchTerms.value.find(item => item[searchKey] !== undefined && item[searchKey] !== null);

  if (foundObject) {
    foundObject[searchKey] = new Date(billingDateEnd.value).toLocaleDateString();
  }
}

const getTenants = (params = [])=>{
  tenants.value = []
  let myParams  = {}

  params.map(query=>{
    Object.assign(myParams,query)
  })

  store.dispatch('fetchList', {
    url: 'tenants',
    params : myParams
  })
      .then((res)=>{
        res.data?.results.map(tenant =>{
          tenants.value.push({value: tenant.id, label : `${tenant.first_name} ${tenant.first_name}`})
        })
        // tenants.value = res.data?.results
        // console.log(res.data)
      })
}
const getProperties = (params = [])=>{
  properties.value = []
  let myParams  = {}

  params.map(query=>{
    Object.assign(myParams,query)
  })

  store.dispatch('fetchList', {
    url: 'property',
    params : myParams
  })
      .then((res)=>{
        console.log(res.data?.results)
        res.data?.results.map(tenant =>{
          properties.value.push({value: tenant.id, label : `${tenant.name}`})
        })
      })
}

const generateInvoices = ()=>{
  store.dispatch('postData', {
    url: 'invoice/generate-invoices',
    payload: {}
    })
      .then((res)=>{
        tenants.value = res.data?.results
        window.location.reload()
      })
      .catch(err=>{
        window.location.reload()
      })
}

const getInvoices =(id,customerAccount,totalBill)=>{
  router.push({name: 'invoicePayment', params: {invoiceId: id,
          customerAccount: customerAccount, totalBill:totalBill}})
}

onMounted(()=>{
  // getTenants([])
})

</script>



<style scoped>

</style>