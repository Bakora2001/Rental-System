import {createRouter, createWebHistory} from "vue-router";
import DashboardHome from "@/pages/DashboardHome.vue";
import PropertyList from "@/pages/properties/PropertyList.vue";
import addEditProperty from "@/pages/properties/addEditProperty.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";
import InvoiceList from "@/pages/invoices/InvoiceList.vue"
import UnitsList from "@/pages/units/UnitsList.vue"
import billTenant from "@/pages/invoices/components/billTenant.vue";
import tenantList from "@/pages/tenants/tenantList.vue";
import CreateEditUnits from "@/pages/units/CreateEditUnits.vue";

const routes = [
    {
        name:'login',
        path : '/',
        component : LoginPage
    },
    {
        name:'home',
        path : '/home',
        children: [
            {
                name:'invoices',
                path : 'invoices',
                component : InvoiceList,
                children : [
                    {
                        name:'addProperty',
                        path : 'add',
                        component : addEditProperty,
                    },
                    {
                        name:'editProperty',
                        path : 'edit',
                        component : addEditProperty,
                    },
                    {
                        name:'invoicePayment',
                        path : 'payment/:invoiceId/:customerAccount/:totalBill',
                        component : billTenant
                    },
                ]
            },
            {
                name:'properties',
                path : 'properties',
                component : PropertyList,
                children : [
                    {
                        name:'addProperty',
                        path : 'add',
                        component : addEditProperty,
                    },
                    {
                        name:'editProperty',
                        path : 'edit',
                        component : addEditProperty,
                    },
                ]
            },
            {
                name:'houses',
                path : 'houses',
                component : UnitsList,
                children: [
                    {
                        name:'editUnits',
                        path : 'edit',
                        slug:'Edit Unit',
                        component : CreateEditUnits,
                    },
                    {
                        name:'addUnits',
                        path : 'new',
                        slug:'Add Unit',
                        component : CreateEditUnits,
                    },
                ]
            },
            {
                name:'tenants',
                path : 'tenants',
                component : tenantList
            },
        ]
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router