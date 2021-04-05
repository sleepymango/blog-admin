<template>
    <el-table
        :data="
      tableData.filter(
        (data) =>
          !search || data.name.toLowerCase().includes(search.toLowerCase())
      )
    "
        style="width: 100%"
    >
        <el-table-column label="日期" prop="date"> </el-table-column>
        <el-table-column label="标题" prop="name"> </el-table-column>
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template #default="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
                >
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
                >
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
    name: 'User',
    components: {},
    setup() {
        const tableData = reactive([
            {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
            },
            {
                date: '2016-05-04',
                name: '小白',
                address: '上海市普陀区金沙江路 1517 弄',
            },
            {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
            },
            {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
            },
        ])

        const search = ref('')

        const handleEdit = (index: number, row: any) => {
            console.log(index, row)
        }
        const handleDelete = (index: number, row: any) => {
            console.log(index, row)
        }

        return { tableData, search, handleEdit, handleDelete }
    },
});
</script>

<style lang='scss' scoped>

</style>