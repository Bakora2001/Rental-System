import { createStore } from "vuex";
import actions from "./actions";
import VuexPersistence from "vuex-persist";

const vuexLocalStorage = new VuexPersistence({
    key: 'vuex',
    storage: window.localStorage
})

export default createStore({
    state: {
        sidebar: false, //toggle all side bars
    },
    mutations: {},
    actions: {
        ...actions.actions,
    },
    modules: {},
    plugins : [vuexLocalStorage.plugin]
});
