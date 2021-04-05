<template>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        username<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-close">退出</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'DropDown',
    components: {},
    setup() {

        return {};
    },
});
</script>

<style lang='scss' scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
}
</style>