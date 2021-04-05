import { ref } from 'vue';


export const articleFormRules = ref({
    title:[{
        required: true,
        message: '请输入文章标题',
        trigger: 'blur'
    },
        {
            min: 6,
            max: 50,
            message: '标题长度必须在6到50个字符之间',
            trigger: 'blur',
        },],
    category:[{
        required: true,
        message: '请选择文章分类',
        trigger: 'blur'
    }],
    content:[{
        required: true,
    }],
    labels:[{
        required: true,
        message: '请选择文章标签',
        trigger: 'blur'
    }]
})

// 日期时间拼接
export const dateFormat = (date: Date) => {
    return (
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()
    );
};

export const article = ref<Article>({
    id: null,
    title: '',
    content: '',
    banner: '',
    view: 0,
    comment: 0,
    like: 0,
    publish: '',
    status: 1,
    authorId: 1,
    categoryId: 1,
    labels: [
        {
            id: null,
            name: '',
            alias: '',
        },
    ],
});

export interface Article {
    id: number | null;
    title: string;
    content: string;
    banner?: string;
    view: number;
    comment: number;
    like: number;
    publish: string;
    status: number;
    authorId: number|null;
    categoryId: number|null;
    labels: Label[];
}

export type Label = {
    id: number | null;
    name: string;
    alias: string;
};

export interface User {
    username: String;
    password: String;
}

export interface LoginRules {
    username: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    password: (
        | {
              required: boolean;
              message: string;
              trigger: string;
              min?: undefined;
              max?: undefined;
          }
        | {
              min: number;
              max: number;
              message: string;
              trigger: string;
              required?: undefined;
          }
    )[];
}
