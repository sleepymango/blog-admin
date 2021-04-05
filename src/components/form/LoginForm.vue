<template>
    <el-form :model="loginUser" status-icon ref="loginForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="loginUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { loginUser, rules } from '@/components/form/loginForm';
// /login请求
import { login } from '@/request/api';

import store from '@/store';
import router from '@/router';

export default defineComponent({
    name: 'LoginForm',
    components: {},
    setup() {
        const loginForm = ref<any>(null);

        // 重置表单
        const resetForm = () => {
            loginForm.value.resetFields();
        };

        // 发送登录请求
        const submitForm = () => {
            login(loginUser.value)
                .then((res) => {
                    const token = res.data.data;
                    store.commit('setToken', token);
                    router.push('/');
                })
        };

        return { loginUser, rules, loginForm, resetForm, submitForm };
    },
});
</script>

<style lang="scss" scoped></style>