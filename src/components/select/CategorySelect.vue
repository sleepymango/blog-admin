<template>
    <el-cascader
        v-model="value"
        :props="props"
        :options="options"
        placeholder="请选择文章分类"
        filterable
        :filter-method="filterMethod"
        clearable
        @change="handleChange"
    >
        <template #default="{ node, data }">
            <span>{{ data.name }}</span>
            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template>
    </el-cascader>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getCategories } from '@/request/api';

export default defineComponent({
    components: {},
    emits: ['getCategoryId'],
    setup(_, { emit }) {
        const value = ref([]);
        const props = ref({
            expandTrigger: 'hover',
            value: 'id',
            label: 'name',
        });
        const options = ref([]);

        // 值改变处理
        const handleChange = (categoryId:number[]) => {
            console.log();
            if (null != categoryId && categoryId.length != 0) {
                let index = categoryId.length - 1;
                emit('getCategoryId', categoryId[index]);
            }
        };
        // 自定义搜索过滤
        const filterMethod = (node: any, keyword: any) => {
            keyword = keyword.toLowerCase();
            let label = node.text.toLowerCase();
            if (label.indexOf(keyword) != -1) {
                return true;
            }
        };

        onMounted(() => {
            getCategories().then((res) => {
                options.value = res.data;
            });
        });

        return { onMounted, value, props, options, handleChange, filterMethod };
    },
});
</script>

<style lang="scss" scoped></style>