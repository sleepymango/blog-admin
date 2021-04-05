<template>
    <!--    <el-button @click="resetDateFilter">清除日期过滤器</el-button>-->
    <!--    <el-button @click="clearFilter">清除所有过滤器</el-button>-->
    <div class="article_table" v-loading="loading" style="height: 550px">
        <el-table row-key="article.id" ref="filterTable" :data="data.content" style="width: 100%">
            <el-table-column prop="article.publish" label="日期" sortable :formatter="formatter">
            </el-table-column>
            <el-table-column prop="article.title" label="标题"></el-table-column>
            <el-table-column prop="author.name" label="作者"></el-table-column>
            <el-table-column label="分类">
                <template #default="scope">
                    {{ scope.row.category.parent.name + ' / ' + scope.row.category.name }}
                </template>
            </el-table-column>
            <el-table-column label="标签">
                <template #default="scope">
                    <el-tag style="margin-right: 2px" v-for="item in scope.row.article.labels"
                        >{{ item.name }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="状态"
                :filters="[
                    { text: '已发布', value: 1 },
                    { text: '待发布', value: 2 },
                    { text: '已删除', value: 0 },
                ]"
                :filter-method="filterTag"
                filter-placement="bottom-end"
            >
                <template #default="scope">
                    <el-tag v-if="scope.row.article.status === 0" type="danger">已删除</el-tag>
                    <el-tag v-else-if="scope.row.article.status === 1" type="info">已发布</el-tag>
                    <el-tag v-else type="success">待发布</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <!--                <template #header>-->
                <!--                    <el-drawer-->
                <!--                        title="我是标题"-->
                <!--                        v-model="editDialogVisible"-->
                <!--                        direction="rtl"-->
                <!--                        destroy-on-close>-->
                <!--                        <span>我来啦!</span>-->
                <!--                    </el-drawer>-->
                <!--                </template>-->
                <template #header>
                    <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                </template>
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                        >编辑
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog
        title="文章编辑"
        v-model="editDialogVisible"
        width="50%"
        :center="true"
        :append-to-body="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
    >
        <el-form>
            <el-form-item label="文章标题" prop="title">
                <el-input
                    style="width: 80%"
                    v-model="articleData.article.title"
                    placeholder="请输入文章标题"
                ></el-input>
            </el-form-item>

            <el-form-item label="文章分类" prop="category">
                <CategorySelect
                    v-model="articleData.article.categoryId"
                    @getCategoryId="handleCategoryId"
                />
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
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="disabled" :loading='buttonLoading' @click="onSubmit">更新</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog
        title="Markdown编辑器"
        v-model="centerDialogVisible"
        :fullscreen="true"
        center
        :before-close="handleBeforeClose"
        destroy-on-close
    >
        <Editor
            ref="editor"
            :text="articleData.article.content"
            @getArticleText="handleArticleText"
        />
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

    <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-model:currentPage="currPage"
            :page-size="size"
            layout="prev, pager, next, jumper"
            :total="data.totalElements"
        >
        </el-pagination>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, Ref } from 'vue';
import { getArticles } from '@/request/api';
import { article, Label } from '@/components/types';
import { ElMessage } from 'element-plus';
import Editor from '@/components/markdown/Editor.vue';
import CategorySelect from '@/components/select/CategorySelect.vue';
import LabelSelect from '@/components/select/LabelSelect.vue';
import Cover from '@/components/upload/Cover.vue';
import { postArticle } from '@/request/api';

export default defineComponent({
    name: 'Article',
    components: { Editor, CategorySelect, LabelSelect, Cover },
    setup() {
        // 表格数据
        const data = ref([]);

        const currPage = ref(1);

        const size = ref(8);

        const loading = ref(false);

        const buttonLoading = ref(false)

        const search = ref('');

        const disabled = ref(false);

        /*-----------编辑处理---------------------------------------------*/
        const editDialogVisible = ref(false);
        const articleData = ref();

        // 监视文章标题和分类是否为空
        watch(articleData,(articleData)=>{
            disabled.value = '' == articleData.article.title || null == articleData.article.categoryId;
        },{
            deep:true
        })

        // 更新文章
        const onSubmit = () => {
            buttonLoading.value = true
            postArticle(articleData.value.article)
                .then((res) => {
                    buttonLoading.value = false
                    editDialogVisible.value = false
                    ElMessage.success('更新成功')
                    handleCurrentChange(1);
                })
                .catch((err) => {
                    console.log(err);
                    ElMessage.error('更新失败，服务器开小差了')
                    buttonLoading.value = false
                });
        };

        // 文章内容
        const handleArticleText = (text: string) => {
            articleData.value.article.content = text;
            console.log(articleData.value.article.content);
        };

        // 文章分类ID
        const handleCategoryId = (categoryId: number) => {
            console.log(categoryId);
            articleData.value.article.categoryId = categoryId;
        };

        // 文章标签
        // let labelList: Label[];
        const handleLabels = (labels: Label[]) => {
            articleData.value.article.labels = labels;
        };

        const handleEdit = (index: number, row: any) => {
            articleData.value = row;
            editDialogVisible.value = true;
            console.log(index, row);
        };

        // 处理删除
        const handleDelete = (index: number, row: any) => {
            console.log(index, row);
        };

        // 对话框是否显示
        const centerDialogVisible = ref(false);
        // 编辑器关闭前回调 ，done用于关闭
        const editor = ref<Ref | undefined>(undefined);
        const handleBeforeClose = (done: () => void) => {
            handleClose = done;
            if ('' != editor.value.text && articleData.value.article.content != editor.value.text) {
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
        /*--------------------------------------------------------------*/
        onMounted(() => {
            loading.value = true;
            // 获取文章列表
            getArticles(1, 8)
                .then((res) => {
                    data.value = res.data;
                    loading.value = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        const handleStatus = (status: any) => {
            if (0 === status) {
                return 'danger';
            } else if (1 === status) {
                return 'info';
            } else return 'success';
        };

        // currentPage改变
        const handleCurrentChange = (currentPage: number) => {
            loading.value = true;
            getArticles(currentPage, size.value)
                .then((res) => {
                    currPage.value = currentPage;
                    data.value = res.data;
                    loading.value = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        // size改变
        const handleSizeChange = (size: number) => {};

        const filterTable = ref();

        const resetDateFilter = () => {
            filterTable.value.clearFilter('date');
        };
        const clearFilter = () => {
            filterTable.value.clearFilter();
        };
        const formatter = (row: any) => {
            let length = row.article.publish.length;
            return row.article.publish.substring(0, length - 3);
        };
        const filterTag = (value: any, row: any) => {
            return row.article.status === value;
        };
        const filterHandler = (value: any, row: any, column: any) => {
            const property = column['property'];
            return row[property] === value;
        };

        return {
            buttonLoading,
            disabled,
            onSubmit,
            editor,
            articleData,
            handleArticleText,
            handleCategoryId,
            handleLabels,
            editDialogVisible,
            cancel,
            save,
            centerDialogVisible,
            dialogVisible,
            handleBeforeClose,
            handleCurrentChange,
            handleSizeChange,
            handleStatus,
            filterHandler,
            filterTag,
            formatter,
            clearFilter,
            resetDateFilter,
            handleEdit,
            handleDelete,
            filterTable,
            data,
            currPage,
            size,
            search,
            loading,
        };
    },
});
</script>

<style lang="scss" scoped></style>