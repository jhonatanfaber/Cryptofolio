import Vue from 'vue'
import Router from 'vue-router'
import { store } from "./store/store"
import Home from "./components/Home.vue"
import Test from "./components/Test.vue"
import Login from "./components/Login.vue"
import ForgotPassword from "./components/ForgotPassword.vue"
import ResetPassword from "./components/ResetPassword.vue"
import Signup from "./components/Signup.vue"
import Users from "./components/admin/Users.vue"
import Portfolio from "./components/user/portfolio/Portfolio.vue"
import Market from "./components/user/Market.vue"
import Profile from "./components/user/Profile.vue"
import Settings from "./components/user/Settings.vue"

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/', name: "home", component: Home
        },
        {
            path: '/test', name: "test", component: Test, redirect: '/'
        },
        {
            path: '/login', name: "login", component: Login
        },
        {
            path: '/forgot_password', name: "forgot_password", component: ForgotPassword
        },
        {
            path: '/reset_password', name: "reset_password", component: ResetPassword
        },
        {
            path: '/signup', name: "signup", component: Signup
        },
        {
            path: "/users", name: "users", meta: { requireAuth: true }, component: Users, beforeEnter(to, from, next) {
                //beforeEnter: requireAuth,
                if (store.getters.user.admin === true || localStorage.getItem("admin") == "true") {

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
            path: "/portfolio", name: "portfolio", component: Portfolio, beforeEnter(to, from, next) {
                if (store.getters.user.admin === false || localStorage.getItem("admin") == "false") {
                    next()
                } else {
                    next(from.path)
                }
            }
        },
        {
            path: "/profile", name: "profile", component: Profile, beforeEnter(to, from, next) {
                if (store.getters.user.admin === false || localStorage.getItem("admin") == "false") {
                    next()
                } else {
                    next(from.path)
                }
            }
        },
        {
            path: "/settings", name: "settings", component: Settings//, beforeEnter(to, from, next) {
            //     if (store.getters.user.admin === false || localStorage.getItem("admin") == "false") {
            //         next()
            //     } else {
            //         next(from.path)
            //     }
            // }
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
