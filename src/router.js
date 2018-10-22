import Vue from 'vue'
import Router from 'vue-router'
import { store } from "./store/store"
import Home from "./components/Home.vue"
import Login from "./components/Login.vue"
import Users from "./components/admin/Users.vue"

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/', name: "home", component: Home
        },
        {
            path: '/login', name: "login", component: Login
        },
        {
            path: "/users", name: "users", component: Users, beforeEnter(to, from, next) {
                console.log(store.getters.user.admin);

                if (store.getters.user.admin === true || localStorage.getItem("admin") == "true") {
                    next()
                } else {
                    next(from.path)
                }
            }
        },
        {
            path: "/*", redirect: "/"
        }
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
})
