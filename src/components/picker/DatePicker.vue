<template>
    <el-date-picker
        v-model="dateValue"
        type="datetime"
        placeholder="选择日期"
        format="YYYY-MM-DD HH:mm:ss"
        :editable="false"
        :default-time="new Date()"
        @blur="change"
        :disabledDate="disabledDate"
    >
    </el-date-picker>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import { useListInject } from '@/utils/provide';

export default defineComponent({
    name: 'DatePicker',
    components: {},
    emits: ['getDate'],
    setup(_, { emit }) {
        const store = useStore();
        // 日期值
        const dateValue = ref<Date>();

        // 当前日期年月日
        const currentDate = () => {
            const date = new Date();
            return new Date(
                date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            );
        };
        // 参数为页面展示的日期，返回true则禁止
        const disabledDate = (date: Date) => {
            return date < currentDate();
        };
        const change = () => {
            emit('getDate', dateValue);
        };
        return {
            dateValue,
            disabledDate,
            change,
        };
    },
});
</script>

<style lang="scss" scoped></style>