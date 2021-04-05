// provide.ts
import { inject, provide, ref } from 'vue'
const listSy = Symbol();
export const useListProvide = () => {
    const list = ref([
        {
            name: 'Mondo'
        },
        {
            name: 'imondo.cn'
        }
    ])
    const getList = () => {
        console.log('getList');
    }
    const add = () => {
        console.log('add')
        list.value.push({
            name: '微木'
        })
    }
    provide(listSy, {
        getList,
        list,
        add
    })
};

export const useListInject = () => {
    return inject(listSy)
}