import Vue from 'vue'
import App from './App.vue'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import VuejsPaginate from 'vuejs-paginate';

import store from './__data__/store'
import router from './router'

Vue.config.productionTip = false

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('paginate', VuejsPaginate);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
