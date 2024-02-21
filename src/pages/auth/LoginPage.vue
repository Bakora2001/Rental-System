<template>
  <main
    class="w-screen h-screen flex items-center justify-center py-32 overflow-y-scroll bg-gray-50"
  >
    <!--    style="background-image: url('src/assets/backGround.jpg')"-->
    <section
      class="w-1/2 h-auto bg-white border rounded-md py-24 px-12"
      style=""
    >
      <div class="flex flex-col justify-between items-center h-full">
<!--        <img-->
<!--          alt="company logo"-->
<!--          class="w-20"-->
<!--        />-->
<!--        src="src/assets/logo.jpg"-->

        <span class="font-bold text-24 text-brand-blue flex gap-2">
          Maxi Housing
          <span><house class="h-6 w-6"/></span>
        </span>
        <p class="text-gray-400">Welcome Back</p>
        <div class="h-2/3 pt-6 w-full">
          <el-form
            ref="loginFormRef"
            :model="form"
            :rules="rules"
            class="flax flex-col gap-4"
            label-position="top"
          >
            <el-form-item label="Username" prop="email">
              <el-input
                v-model="form.username"
                :prefix-icon="UserIcon"
                placeholder="username"
                size="large"
                type="text"
              />
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input
                v-model="form.password"
                :prefix-icon="LockClosedIcon"
                placeholder="password"
                show-password
                size="large"
                type="password"
              />
            </el-form-item>
            <div class="flex w-full bg-red-400">
              <el-button
                :loading="loading"
                class="w-full"
                type="primary"
                @click="login"
              >
                <!--                @click="submitForm(loginFormRef)"-->

                Login
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import { FormInstance, FormRules } from "element-plus";
import store from "@/store";
import router from "@/router";
import {House} from "@element-plus/icons-vue";

const loading = ref(false);
const form = reactive({
  username: "",
  password: "",
});

const loginFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      trigger: "blur",
      message: "Please enter username",
    },
  ],
  password: {
    required: true,
    trigger: "blur",
    message: "Please enter password",
  },
});
const submitForm = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store
        .dispatch("postData", {
          url: "token/request",
          data: {
            username: form.username,
            password: form.password,
          },
        })
        .then((resp) => {
          localStorage.setItem("authData", JSON.stringify(resp.data));
          router.push({ name: "properties", replace: true });
        });
    } else {
      alert("error submit!", fields);
    }
    loading.value = false;
  });
};

const login =()=>{
  router.push(
      {name: 'invoices'}
  )
}
</script>

<style scoped></style>
