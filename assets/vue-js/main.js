"use strict"

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAuth from '@websanova/vue-auth'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue';
import Account from './components/Account.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

Vue.use(VueRouter);

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:8000/api/v1';

// Routes
const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {auth: false}
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {auth: false}
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
        meta: {auth: true}
    },
    {
        path: '*',
        redirect: '/account',
    },
];

Vue.router = new VueRouter({
    routes // сокращение от `routes: routes`
});

Vue.use(VueAuth, {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    fetchData: {
        url: '/user',
        method: 'GET'
    },
    logoutData: {
        method: 'GET'
    },
});

// Handle errors
Vue.axios.interceptors.response.use(function(response) {
    return response;
}, function (error) {
    if (
        error.response.statusCode() === 401 &&
        ['UnauthorizedAccess', 'InvalidToken'].indexOf(error.response.data.code) > -1
    ) {
        window.localStorage.clear();
        Vue.auth.logout({
            redirect: {
                name: 'login'
            }
        });
    } else if (error.response.statusCode() === 500) {
        Vue.router.push({
            name: 'error-500'
        });
    } else {
        return error;
    }
});

// Mount app
App.router = Vue.router;
new Vue(App).$mount('#lk');