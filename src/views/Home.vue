<template>
  <el-container>
      <keep-alive>
          <Aside />
      </keep-alive>
    <el-container>
      <el-header>
        <Header />
      </el-header>

      <el-main>
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'
import Main from '@/components/Main.vue'
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'Home',
  components: { Aside, Main, Header },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>

.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}
//
.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    //line-height: 160px;
}

body > .el-container {
    margin-bottom: 40px;
}

//.el-container:nth-child(5) .el-aside,
//.el-container:nth-child(6) .el-aside {
//    line-height: 260px;
//}

//.el-container:nth-child(7) .el-aside {
//    line-height: 320px;
//}
</style>
