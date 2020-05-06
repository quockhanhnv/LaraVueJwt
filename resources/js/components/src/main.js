import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import VueRouter from 'vue-router';

// components
import Login from './components/Auth/Login.vue';
import Dashboard from './components/HelloWorld.vue';

import App from './App.vue'



Vue.config.productionTip = false

Vue.use(ElementUI, {locale});
Vue.use(VueRouter);

const routes = [
    {path: '/login', name: 'login', component: Login},
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard
    },
];

const router = new VueRouter({
    routes
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
