import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
import store from '@/store'
// element-plus UI组件库
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import '@/assets/style/base.scss'

const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
