<template>
    <el-select
        v-model="value"
        multiple
        filterable
        default-first-option
        value-key="id"
        @change="handleChange"
        :multiple-limit="3"
        placeholder="请选择文章标签"
    >
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item">
        </el-option>
    </el-select>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getLabels } from '@/request/api';
import { Label } from '@/components/types';

export default defineComponent({
    name: 'LabelSelect',
    components: {},
    emits: ['getLabels'],
    setup(_, { emit }) {
        const options = ref([]);

        const value = ref({});

        // 将标签ID列表发送给父组件
        const handleChange = (labels: Label[]) => {
            emit('getLabels', labels);
        };

        onMounted(() => {
            // 获取标签列表
            getLabels().then((res) => {
                options.value = res.data;
            });
        });

        return {
            options,
            value,
            onMounted,
            handleChange,
        };
    },
});
</script>

<style lang="scss" scoped></style>