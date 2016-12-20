import Vue from 'vue'

import header from '../components/global-header'

window.Vue = Vue

Vue.component('global-header', {
    /*
     *If don't need back home button, set 'more' to false
     *Default true
     */
    props: ['more'],

    template: '<div>{{more}}</div>'
})
