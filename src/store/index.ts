import { createStore } from 'vuex';

import { LOGIN_SUCCESS } from '@/store/mutation-types';

const store = createStore({
    state() {
        return {
            loginStatus: false,
            token: ''
        };
    },
    mutations: {
        [LOGIN_SUCCESS](state: any, status: boolean) {
            state.loginStatus = status;
        },

        setToken(state: any, token: string) {
            state.token = token;
        }
    },
    getters: {
        getToken(state) {
            if (!state.token) {
                state.token = getCookie('token');
            }
            return state.token;
        },
    },

    actions: {},
});


// 获取cookie
function getCookie(name: string) {
    const cookieArr = document.cookie.split(';');
    for (let cookie of cookieArr) {
        const arr = cookie.split('=');
        if (name == arr[0]) {
            return arr[1];
        }
    }
    return '';
}

export default store;
