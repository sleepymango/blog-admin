<template>
    <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1">
        <template #default>
            <i class="el-icon-plus"></i>
        </template>
        <template #file="{ file }">
            <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                    >
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                    >
                        <i class="el-icon-download"></i>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                    >
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </template>
    </el-upload>
    <el-dialog v-model="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Cover',
    components: {},
    setup() {
        const dialogImageUrl = ref(''),
            dialogVisible = ref(false),
            disabled = ref(false);

        const handleRemove = (file) => {
                console.log(file.url);
            },
            handlePictureCardPreview = (file) => {
                dialogImageUrl.value = file.url;
                dialogVisible.value= true;
            },
            handleDownload = (file) => {
                console.log(file);
            };

        return {
            dialogImageUrl,
            dialogVisible,
            disabled,
            handleRemove,
            handlePictureCardPreview,
            handleDownload,
        };
    },
});
</script>

<style lang="scss" scoped></style>
