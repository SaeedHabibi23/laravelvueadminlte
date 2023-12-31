/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('admin-lte');
window.Vue = require('vue').default;


import { Errors, Form } from 'vform';

window.Form = Form;

Vue.component(Errors.name, Errors)

import VueRouter from 'vue-router';
Vue.use(VueRouter)

import moment from 'moment'

let routes = [
    {path: '/dashboard' , component: require('./components/Dashboard.vue').default} , 
    {path: '/profile' , component: require('./components/Profile.vue').default} , 
    {path: '/users' , component: require('./components/Users.vue').default}
]

const router = new VueRouter({
    mode: 'history',
    routes
})

Vue.filter('propper' , function(text){
    return text.charAt(0).toUpperCase() + text.slice(1)
})

Vue.filter('formatdate' , function(created_at){
    return moment(created_at).format('YYYY MM DD')
})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
