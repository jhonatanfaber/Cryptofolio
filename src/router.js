import Vue from 'vue'
import Router from 'vue-router'
import { store } from "./store/store"
import Home from "./components/Home.vue"
import Login from "./components/Login.vue"
import Users from "./components/admin/Users.vue"
import Portfolio from "./components/user/Portfolio.vue"
import Market from "./components/user/Market.vue"

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
                if (store.getters.user.admin === true || localStorage.getItem("admin") == "true") {
                    next()
                } else {
                    next(from.path)
                }
            }
        },
        {
            path: "/portfolio", name: "portfolio", component: Portfolio, beforeEnter(to, from, next) {
                if (store.getters.user.admin === false || localStorage.getItem("admin") == "false") {
                    next()
                } else {
                    next(from.path)
                }
            }
        },
        {
            path: "/market", name: "market", component: Market, beforeEnter(to, from, next) {
                if (store.getters.user.admin === false || localStorage.getItem("admin") == "false") {
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
