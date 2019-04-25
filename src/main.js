import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from "vuelidate"
import { store } from './store/store'

Vue.use(Vuelidate)

Vue.config.productionTip = false
export const busPrice = new Vue()

const openRoutes = ["home", "login", "signup","forgot_password", "reset_password"]
router.beforeEach((to, from, next) => {
  if (openRoutes.includes(to.name)) {
    next()
  } else if (store.state.user.token || localStorage.getItem("token")) {
    next()
  } else {
    next("/home")
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
