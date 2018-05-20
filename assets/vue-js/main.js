"use strict";

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAuth from '@websanova/vue-auth'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'
import Notifications from 'vue-notification'
import VueClipboard from 'vue-clipboard2'

const VueInputMask = require('vue-inputmask').default

import App from './App.vue'
import Account from './components/Account.vue'
import Login from './components/Login.vue'
import Messages from './components/Messages.vue'
import Register from './components/Register.vue'
import Settings from './components/Settings.vue'
import Signal from './components/Signal.vue'
import Referral from './components/Referral.vue'

import moment from 'moment'

Vue.use(VModal);
Vue.use(Notifications);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueClipboard);
Vue.use(VueInputMask);

Vue.axios.defaults.baseURL = 'http://localhost:8000/api/v1';

// Routes
const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false
        }
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
        meta: {
            auth: true
        }
    },
    {
        path: '/signals',
        name: 'signals',
        component: Signal,
        meta: {
            auth: true
        }
    },
    {
        path: '/referral',
        name: 'referral',
        component: Referral,
        meta: {
            auth: true
        }
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        meta: {
            auth: true
        }
    },
    {
        path: '/messages',
        name: 'messages',
        component: Messages,
        meta: {
            auth: true
        }
    },
    {
        path: '/',
        name: 'default',
        redirect: '/account',
        meta: {
            auth: true
        }
    },
];

Vue.router = new VueRouter({
    routes // сокращение от `routes: routes`
});

Vue.prototype.$notifyServerError = function(group) {
    Vue.prototype.$notify({
        group,
        type: 'error',
        title: 'Ошибка сервера',
        text: 'Произошла ошибка, повторите попытку позднее.'
    })
};

Vue.prototype.$notifySuccess = function(group, title, text) {
    Vue.prototype.$notify({
        group,
        title,
        text
    })
};

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

Vue.axios.interceptors.response.use(

    (response) => { return response },

    (error) => {
        // Error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            if (
                error.response.status === 401 &&
                ['UnauthorizedAccess', 'InvalidToken'].indexOf(error.response.data.code) > -1
            ) {
                window.localStorage.clear();
                Vue.auth.logout({
                    redirect: {
                        name: 'login'
                    }
                });
            } else if (error.response.status === 500) {
                // Vue.router.push({
                //     name: 'error-500'
                // });
                Vue.prototype.$notifyServerError('lk');
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            Vue.prototype.$notifyServerError('lk');
        }
});

// Time formatter
Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('DD.MM.YYYY')
    }
});

// Mount app
App.router = Vue.router;
new Vue(App).$mount('#lk');