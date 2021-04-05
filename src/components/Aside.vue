<template>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
    >
        <div class="fold-button">
            <div @click="fold"><i style="font-size: 30px" class="el-icon-s-unfold"></i></div>
        </div>

<!--        elementUi index为字符串格式需要转格式否则会警告-->
        <el-submenu v-for="(item, index1) in menuList" :key="index1" :index="index1 + 1+''">
            <template #title>
                <i class="el-icon-location"></i>
                <span>{{ item.name }}</span>
            </template>
            <router-link
                v-for="(item, index2) in item.children"
                :key="index2"
                :to="item.url"
                replace
            >
                <el-menu-item :index="index1 + 1 + '-' + (index2 + 1)">
                    {{ item.name }}
                </el-menu-item>
            </router-link>
        </el-submenu>
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref,toRefs } from 'vue';
import { getMenus } from '@/request/api';

export default defineComponent({
    name: 'Aside',
    components: {},
    setup(props, context) {
        const menuList = ref([]);

        onMounted(() => {
            // 获取菜单列表
            getMenus().then(res=>{
                menuList.value = res.data;
            })
        });

        // 展开和折叠侧边栏
        const fold = () => {
            isCollapse.value = !isCollapse.value;
        };

        const isCollapse = ref(false);

        const handleOpen = (key: any, keyPath: any) => {
            console.log(key, keyPath);
            //   isCollapse.value = true
        };

        const handleClose = (key: any, keyPath: any) => {
            console.log(key, keyPath);
            //   isCollapse.value = false
        };

        return { isCollapse, handleOpen, handleClose, menuList, getMenus, onMounted, fold };
    },
});
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
    min-height: 100vh;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}

.fold {
    transform: rotateY(180deg);
    transition: all 0.5s;
}

.unfold {
    //transform: rotate(0);
    transition: all 0.5s;
}

//.fold-button{
//    display: flex;
//    justify-content: flex-end;
//}

//.el-menu {
//    .logo {
//        height: 60px;
//        line-height: 60px;
//        text-align: center;
//    }
//}
</style>
