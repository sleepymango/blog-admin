<template>
    <el-form
        :model="article"
        :rules="articleFormRules"
        label-width="100px"
        v-loading.fullscreen.lock="fullscreenLoading"
    >
        <el-form-item label="文章标题" prop="title">
            <el-input v-model="article.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>

        <el-form-item label="文章分类" prop="category">
            <CategorySelect v-model="article.categoryId" @getCategoryId="handleCategoryId" />
        </el-form-item>

        <el-form-item label="选择标签" prop="labels">
            <LabelSelect @getLabels="handleLabels" />
        </el-form-item>

        <el-form-item label="编辑内容" prop="content">
            <el-button
                @click="centerDialogVisible = true"
                type="primary"
                icon="el-icon-edit"
            ></el-button>
        </el-form-item>

        <el-form-item label="选择封面">
            <Cover />
        </el-form-item>

        <el-form-item label="发布时间" prop="date">
            <DatePicker @getDate="handleDate" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">发布</el-button>
        </el-form-item>
    </el-form>
    <!--      <Editor />-->
    <el-dialog
        title="Markdown编辑器"
        v-model="centerDialogVisible"
        :fullscreen="true"
        center
        :before-close="handleBeforeClose"
        destroy-on-close
    >
        <Editor ref="editor" :text="article.content" @getArticleText="handleArticleText" />
        <el-dialog
            title="提示"
            v-model="dialogVisible"
            width="30%"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            center
            destroy-on-close
        >
            <span>内容未保存，确认保存？</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="save">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import Upload from '@/components/main/Upload.vue';
import Editor from '@/components/markdown/Editor.vue';
import LabelSelect from '@/components/select/LabelSelect.vue';
import Cover from '@/components/upload/Cover.vue';
import TimePicker from '@/components/picker/TimePicker.vue';
import DatePicker from '@/components/picker/DatePicker.vue';
import TimeSelect from '@/components/select/TimeSelect.vue';
import CategorySelect from '@/components/select/CategorySelect.vue';
import { postArticle } from '@/request/api';
import { article, Article, articleFormRules, Label, dateFormat } from '@/components/types';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'ArticleForm',
    components: {
        CategorySelect,
        TimeSelect,
        DatePicker,
        TimePicker,
        Cover,
        LabelSelect,
        Editor,
        Upload,
    },
    setup() {
        const router = useRouter();

        // 加载动画
        const fullscreenLoading = ref(false);

        // 编辑器关闭前回调 ，done用于关闭
        const editor = ref<Ref | undefined>(undefined);
        const handleBeforeClose = (done: () => void) => {
            handleClose = done;
            if ('' != editor.value.text && article.value.content != editor.value.text) {
                dialogVisible.value = true;
            } else {
                dialogVisible.value = false;
                done();
            }
        };
        //  若编辑区有内容则弹出对话框确认
        let handleClose = () => {};
        const dialogVisible = ref(false);
        const cancel = () => {
            dialogVisible.value = false;
            handleClose();
            ElMessage.info('内容未保存');
        };
        const save = () => {
            editor.value.save();
            // article.value.content = editor.value.text;
            dialogVisible.value = false;
            handleClose();
            ElMessage.info('内容已保存');
        };

        // 发布文章
        const onSubmit = () => {
            fullscreenLoading.value = true;
            postArticle(article.value)
                .then((res) => {
                    if (res.status === 200) {
                        fullscreenLoading.value = false;
                        ElMessage.success('发布成功');
                        // router.replace('/article/list');
                    }
                })
                .catch((err) => {
                    fullscreenLoading.value = false;
                    ElMessage.error('服务器出错了');
                });
        };

        // 对话框是否显示
        const centerDialogVisible = ref(false);

        // 文章内容
        const handleArticleText = (text: string) => {
            article.value.content = text;
            console.log(article.value.content);
        };

        // 文章分类ID
        const handleCategoryId = (categoryId: number) => {
            article.value.categoryId = categoryId;
        };

        // 文章标签
        // let labelList: Label[];
        const handleLabels = (labels: Label[]) => {
            article.value.labels = labels;
        };

        // 文章日期时间
        const handleDate = (date: Ref<Date>) => {
            if (undefined == date.value) {
                return;
            } else if (date.value < new Date()) {
                ElMessage.error('指定时间需晚于当前');
            } else {
                article.value.publish = dateFormat(date.value);
            }
        };

        return {
            fullscreenLoading,
            dialogVisible,
            cancel,
            save,
            editor,
            centerDialogVisible,
            article,
            articleFormRules,
            onSubmit,
            handleCategoryId,
            handleArticleText,
            handleLabels,
            handleDate,
            handleBeforeClose,
        };
    },
});
</script>

<style lang="scss" scoped>
.el-form {
    width: 800px;
    text-align: justify;
}

//.el-select {
//    display: block;
//}
</style>