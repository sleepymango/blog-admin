import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 懒加载
const Login = () => import('@/views/login.vue');
const Home = () => import('@/views/home.vue');
const ArticleList = () => import('@/components/table/ArticleList.vue');
const UserList = () => import('@/components/table/UserList.vue');
const About = () => import('@/views/About.vue');
const ArticleForm = () => import('@/components/main/ArticleForm.vue');
const UserForm = () => import('@/components/main/UserForm.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        redirect: () => {
            return {
                path: '/about',
            };
        },
    },

    {
        path: '/index',
        name: 'Login',
        component: Login,
        // beforeEnter:((to, from, next) => {
        //
        // })
    },

    {
        path: '',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/user',
                redirect: () => {
                    return '/user/add';
                },
            },
            {
                path: '/user/list',
                name: 'User',
                component: UserList,
            },

            {
                path: '/user/add',
                name: 'NewUser',
                component: UserForm,
            },
            {
                path: '/about',
                name: 'About',
                component: About,
            },

            {
                path: '/article',
                redirect: () => {
                    return '/article/add';
                },
            },

            {
                path: '/article/list',
                name: 'Article',
                component: ArticleList,
            },

            {
                path: '/article/add',
                name: 'NewArticle',
                component: ArticleForm,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
});

// 前置钩子,必须调用next()
router.beforeEach((to, from, next) => {
    next();
});

export default router;
