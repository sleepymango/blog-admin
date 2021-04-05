<template>
  <el-time-select
      v-model="value"
      start='08:30'
      step='00:15'
      end='18:30'
      placeholder="选择时间">
  </el-time-select>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'TimeSelect',
  components: {},
  setup() {


     const value = ref('')
    return {
    value
    }
  }
})
</script>

<style lang="scss" scoped>

</style>