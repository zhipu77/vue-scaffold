import Router from 'vue-router'

import home from '../pages/home'
import app from '../app'

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/home',
        component: home,
    }]
})

new Vue({
    el: '#app',
    router: router,
    render: h => h(app)
})
