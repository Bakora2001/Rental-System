<template>
  <BaseDrawer :width="800" title="Invoice Payment">
    <div class="flex flex-col gap-2">
      <el-form
          :inline="false"
          label-position="top"
          class="flex flex-col gap-x-4 gap-y-4"
          @submit="attemptSubmit"
          :model="invoiceObject">
          <div class="grid grid-cols-2 gap-4">
            <el-form-item label="Transaction Code">
              <el-input v-model="invoiceObject.transaction_code" />
            </el-form-item>

            <el-form-item label="Customer Account Number">
              <el-input disabled
                  v-model="invoiceObject.customer_account_number" />
            </el-form-item>

            <el-form-item label="Amount">
              <el-input-number  v-model="invoiceObject.amount" />
            </el-form-item>

            <el-form-item label="Utilized Amount">
              <el-input-number  v-model="invoiceObject.utilized_amount" />
            </el-form-item>

            <el-form-item label="Transaction Status">
              <el-switch
                  v-model="invoiceObject.transaction_status"
                  active-text="Processed"
                  inactive-text="Unprocessed"
                  active-value="processed"
                  inactive-value="processing"
              />
            </el-form-item>

          </div>

        <el-form-item>
          <el-button type="primary"
                     :loading="submitLoader"
                     @click="attemptSubmit"
                     class="w-full">
            Submit
          </el-button>
        </el-form-item>

      </el-form>
    </div>
  </BaseDrawer>

</template>

<script>
import BaseDrawer from "@/components/base/BaseDrawer.vue";
import store from "@/store";

export default {
  name: "billTenant",
  components: {BaseDrawer},
  props : {
    invoiceObject : {
      type: Object,
      default : {}
    },
    totalBill: {
      type: Number,
      default: 0
    },
    customerAccount: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      invoiceObject : {
        transaction_status: 'processed',
        customer_account_number:  this.$route.params.customerAccount ,
        amount:  Number(this.$route.params.totalBill ),
        utilized_amount: 0
      },
      submitLoader: false,

    }
  },
  methods: {
    fillInvoice(){
      this.invoiceObject.invoice_id = this.$route.params.invoiceId
    },
    attemptSubmit(){
      this.submitLoader = true
      store.dispatch('postData',{
        url:'transaction',
        data : {...this.invoiceObject}
      })
          .then(res=>{
            this.submitLoader = false
            this.$router.go(-1)
          })
          .catch(err=>{
            this.submitLoader = false
          })
    },
    fetchInvoice(){
      store.dispatch('fetchSingleItem', {
        id: this.$route.params.invoiceId,
        url:'invoice',
      })
    },
  },
  mounted() {
    this.fillInvoice()
    this.fetchInvoice()
  }
}
</script>



<style scoped>

</style>