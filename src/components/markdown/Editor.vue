<template>
    <v-md-editor
        v-model="text"
        :disabled-menus="[]"
        @upload-image="handleUploadImage"
        @save="save"
    ></v-md-editor>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
    name: 'Editor',
    components: {},
    props:{
        text:String
    },
    emits: ['getArticleText'],
    setup(props, { emit }) {
        const text = ref(props.text);

        const save = () => {
            emit('getArticleText', text.value);
            ElMessage.info('内容已保存')
        };

        const handleUploadImage = (event: any, insertImage: any, files: any) => {
            console.log(event);
            console.log(insertImage);
            console.log(files);
        };
        return {
            text,
            handleUploadImage,
            save,
        };
    },
});
</script>

<style lang="scss" scoped></style>
