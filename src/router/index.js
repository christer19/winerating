import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'wineList',
        component: ()=> import('../dashboards/WineList.vue')
    },
    {
        path: '/card/:wine_id/:vintage',
        name: 'oneCard',
        component: ()=> import('../dashboards/WineCard.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL || '/',
    routes
});

export default router
