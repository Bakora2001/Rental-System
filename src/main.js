import './assets/input.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import router from "./router/index.js";
import store from "./router/index.js";
import api from "@/utils/api";
import {notification} from "ant-design-vue";
import {deleteLocalStorageInformation} from "@/utils/functions";

api.interceptors.request.use((config) => {
    const authData = JSON.parse(localStorage.getItem("authData"));

    if (authData?.access) {
        config.headers.Authorization = authData?.access
            ? "Bearer " + authData?.access
            : "";//else
        console.log('url hit')
    }
    return config;

});
api.interceptors.response.use(undefined, function (err) {
    return new Promise(function () {
        if (err.response.status === 401) {
            notification["error"]({
                message: "Error",
                description: "Session Expired. Please Login Again",
            });
            deleteLocalStorageInformation()

            router.push({name : "login"});

        } else if (err.response.status === 403) {
            notification["error"]({
                message: "Error",
                description: "Permission Denied",
            });
        } else if(err.response.status === 413){
            notification["error"]({
                message: "Error",
                description: "Entity too large",
            });
        }
        throw err;
    });
})


const app = createApp(App)
app.use(ElementPlus, { size: "large" });
app.use(router);
app.use(store);
app.mount('#app')

