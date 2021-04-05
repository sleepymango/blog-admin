<template>
    <el-time-picker
        v-model="timeValue"
        :editable="false"
        value-format="yyyy-MM-dd hh:mm:ss"
        placeholder="选择时间"
        @blur="change"
    >
    </el-time-picker>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'TimePicker',
    components: {},
    emits: ['getTime'],
    setup(_, { emit }) {
        // 时间值
        const timeValue = ref<Date>();

        const change = () => {
            emit('getTime', timeValue);
        };

        return {
            timeValue,
            change,
        };
    },
});
</script>

<style lang="scss" scoped></style>