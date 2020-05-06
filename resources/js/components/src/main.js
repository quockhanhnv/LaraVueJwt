import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import VueRouter from 'vue-router';

import store from "./store"; // khai báo global folder store (để dùng vuex)
import axios from 'axios'

require('@/store/subscriber')

// components
import Login from './components/Auth/Login.vue';
import Dashboard from './components/HelloWorld.vue';

import App from './App.vue'

import  {i18n} from "./plugins/i18n";
import FlagIcon from 'vue-flag-icon';

axios.defaults.baseURL = 'http://localhost:8000/api'
Vue.config.productionTip = false



Vue.use(ElementUI, {locale});
Vue.use(VueRouter);
Vue.use(FlagIcon);

const routes = [
    {path: '/login', name: 'login', component: Login},
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            // console.log(store.getters)
            if(!store.getters['auth/authenticated']) {
                return next({
                    name: 'login'
                })
            }
            next()
        }
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
})

// for reauthenticate mỗi  lần load lại trang sẽ lấy token ở localStorage gửi lên hàm attempt trong auth.js
store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
    new Vue({
        router,
        store,
        i18n,
        render: h => h(App),
    }).$mount('#app')
})

