import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 懒加载
const Login = () => import('@/views/login.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: () => {
      return {
        path: '/login',
      }
    },
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
