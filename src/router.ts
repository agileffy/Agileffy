import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Write from './views/Write.vue';
import Register from './views/Register.vue';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        {
            path: '/write_ori',
            name: 'write_ori',
            component: () => import('./views/WriteView.vue'),
        },
        {
            path: '/write',
            name: 'write',
            component: Write,
        },
    ],
});
