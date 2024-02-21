<template>
  <div
      class="w-full py-4 px-4 flex justify-between bg-white border-b border-b-gray-100"
  >
    <div class="font-medium text-lg">{{ title }}</div>
    <div class="flex gap-6">

      <slot name="primaryAction">

      </slot>
      <router-link
          v-if="createRouteName !== undefined"
          :to="{ name: createRouteName }"
      >
        <el-button type="primary">
          <template #icon>
            <PlusOutlined></PlusOutlined>
          </template>
          Add New
        </el-button>
      </router-link>

      <div class="flex items-center gap-4 font-bold text-gray-800">
        <FilterOutlined
            v-if="!showFilters"
            @click="showFilters = !showFilters"
        ></FilterOutlined>
        <FilterFilled
            v-if="showFilters"
            @click="showFilters = !showFilters"
        ></FilterFilled>
        <ReloadOutlined
            @click="queryData(fetchUrl)">
        </ReloadOutlined>
        <CircleCloseFilled
            class="h-5 w-5 cursor-pointer hover:text-red-500"/>
      </div>
    </div>
  </div>
  <div class="flex flex-col w-full h-full">
    <div class="w-full otherFilters py-2" v-if="showFilters">
      <slot name="otherFilters">

      </slot>
    </div>
    <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :row-key="(record) => record?.id"
    >
      <template #bodyCell="{ column, text }">
        <slot :column="column" :text="text" name="bodyCell"></slot>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { Table } from 'ant-design-vue';
import {
  FilterFilled,
  FilterOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import {CircleCloseFilled} from "@element-plus/icons-vue";

export default {
  name: "BaseTable",
  components: {
    CircleCloseFilled,
    PlusOutlined,
    ReloadOutlined,
    SettingOutlined,
    FilterOutlined,
    FilterFilled,
    ATable: Table,
  },
  data() {
    return {
      dataSource: [],
      showFilters: false,
      loading: true,
    };
  },
  props: {
    searchTerms: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      required: true,
    },
    createRouteName: {
      type: String,
      default: undefined,
    },
    fetchUrl: {
      type: String,
      default: "Client/list",
    },
    columns: {
      type: Array,
      default: () => {
        return [
          {
            title: "Name",
            dataIndex: "firstName",
            sorter: true,
            width: "20%",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
        ];
      },
    },
  },
  methods: {
    queryData (url ,params = this.searchTerms){
      this.loading = true;

      let myParams = {}

      params.map(query=>{
        Object.assign(myParams,query)
      })

      store.dispatch('fetchList', {
        url: url,
        params : myParams
      })
          .then((resp)=>{
            this.dataSource = resp.data.results;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });

    }
  },
  watch: {
    'searchTerms': {
      handler(newValue, oldValue) {
        this.queryData(this.fetchUrl);
      },
      deep: true, // Watch for deep changes (i.e., changes within objects)
      immediate: true // Trigger the handler immediately when the component is created
    }
  },
  mounted() {
    this.queryData(this.fetchUrl);
  },
};
</script>

<style scoped>
  .otherFilters > * {
    @apply flex flex-wrap justify-end w-full
  }
</style>
