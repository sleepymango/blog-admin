import { createApp } from 'vue';
import App from './App.vue';

// 路由和vuex状态管理
import router from '@/router';
import store from '@/store';
// element-plus UI组件库
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// elementUi使用中文
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale/lang/zh-cn';

// 自定义基础样式
import '@/assets/style/base.scss';

// 引入v-md-editor Markdown编辑器
// @ts-ignore
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

//  使用vuepress主题
VMdEditor.use(githubTheme);

const app = createApp(App);

app.use(VMdEditor);

app.use(ElementPlus, { locale });
app.use(store);
app.use(router);
app.mount('#app');
