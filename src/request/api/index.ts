import axios from '@/request';
import qs from 'qs';
import router from '@/router';
import store from '@/store';
import { Article, Label } from '@/components/types';

// 登录
export const login = async (loginUser: any) => {
    // 序列化loginUser
    return await axios.post('/login', qs.stringify(loginUser));
};

// 分类列表
export const getCategories = async () => {
    const res = await axios.get('/categories');
    return res.data;
};

//  菜单列表
export const getMenus = async () => {
    const res = await axios.get('/menus');
    return res.data;
};

// 发布文章
export const postArticle = async (article: Article) => {
    return axios.post('/articles', article);
};

// 标签列表
export const getLabels = async () => {
    const res = await axios.get('/labels');
    return res.data;
};

// 获取文章列表
export const getArticles = async (page: number, size: number) => {
    const res = await axios.get('/articles', {
        params: {
            page,
            size,
        },
    });
    return res.data;
};
