<template>
  <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false">
    <template #trigger>
      <el-button size="small" type="primary">选取文件</el-button>
    </template>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <template #tip>
      <div class="el-upload__tip">
        只能上传 jpg/png 文件，且不超过 500kb
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts">
import {defineComponent, ref,} from 'vue'

export default defineComponent({
  name: 'Upload',
  components: {},

  setup() {
    const upload = ref<any>(null)

    const fileList = ref([{
      name: 'food.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    }, {
      name: 'food2.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    }])

    const submitUpload = () => {
      upload.submit();
    }
    const handleRemove = (file: any, fileList: any) => {
      console.log(file, fileList);
    }
    const handlePreview = (file: any) => {
      console.log(file);
    }


    return {upload, fileList, submitUpload, handleRemove, handlePreview}
  },


})
</script>

<style lang="scss" scoped>

</style>