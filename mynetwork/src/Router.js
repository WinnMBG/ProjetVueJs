import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/front/Home.vue';
import Login from './components/front/Login.vue'
import Signin from './components/front/Signin.vue'
import NoFound from './components/front/NoFound.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/', name: "home", component: Home},
        // {path:'/home', name: "home", component: Home},
        {path:'/login', name: "login", component: Login},
        {path:'/signin', name: "signin", component: Signin},
        {path:'/:pathMatch(.*)*', name:"NoFound", component: NoFound}
    ]
})