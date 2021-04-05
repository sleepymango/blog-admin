<template>
    <div class='avatar'>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Avatar',
    components: {},
    setup() {

        return {};
    },
});
</script>

<style lang='scss' scoped>
.avatar{
    margin-right: 10px;
    height: 60px;
    display: flex;
    align-items: center;
}
</style>