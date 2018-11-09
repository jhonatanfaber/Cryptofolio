import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import customisedUsersAxios from "./../customisedAxios/usersAxios.js"
import router from "./../router"


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: {},
        invalidUser: false,
        isAdmin: false,
        users: [],
        // ********
        cryptoData: [],
        cryptoIDs: [],
        portfolio : []
    },
    getters: {
        user(state) {
            return state.user
        },
        invalidUser(state) {
            return state.invalidUser
        },
        isAdmin(state) {
            return state.isAdmin
        },
        users(state) {
            return state.users
        },
        // ********
        cryptoData(state) {
            return state.cryptoData
        },
        getCryptoDataById: (state) => (id) => {
            return state.cryptoData.find(coin => coin.id == id)
        },
        portfolio(state){
            return state.portfolio
        }
    },
    mutations: {
        login(state, data) {
            state.user = data
        },
        getUsers(state, data) {
            state.users = data
        },
        createUser(state, data) {
            state.users.push(data)
        },
        deleteUser(state, payload) {
            state.users.splice(payload.index, 1)
        },
        editUser(state, data) {
            state.users.forEach(user => {
                if (user.id == data.id) {
                    user.name = data.name
                    user.password = data.password
                    user.admin = data.admin
                }
            })
        },
        clearUserData(state) {
            state.user = {};
            state.isAdmin = false
            localStorage.clear()
            router.push({ path: "/login" })
        },
        // ********
        saveCryptoDataLocally(state, data) {
            state.cryptoData = []
            state.cryptoIDs = []
            data.forEach(crypto => {
                const newCrypto = {
                    id: crypto.id,
                    name: crypto.name,
                    symbol: crypto.symbol,
                    slug: crypto.slug,
                    change24h: crypto.quote.USD.percent_change_24h,
                    usdCurrentPrice: crypto.quote.USD.price,
                    btcCurrentPrice : null
                }
                state.cryptoData.push(newCrypto)
                state.cryptoIDs.push(crypto.id)
            })
        },
        saveLogos(state, data) {
            state.cryptoData.forEach(crypto => {
                for (const key of Object.keys(data)) {
                    if (crypto.id == data[key].id) {
                        crypto.logo = data[key].logo
                        break;
                    }
                }
            })
            return state.cryptoData
            console.log("saving logo...... estoy en 5");
        },
        mergeCoinPriceWithCryptoDataArray(state, {response, targetCoin}){
            state.cryptoData.forEach(coin => {
                if(coin.symbol == targetCoin){
                    return coin.btcCurrentPrice = response.data.BTC
                }
            })
        }
    },
    actions: {
        login(context, payload) {
            customisedUsersAxios.post("/login", payload)
                .then(res => {
                    if (res.data.token) {
                        if (res.data.admin) {
                            context.state.isAdmin = true
                        }
                        //redirects to home after log in
                        router.push({ path: "/" })
                        context.commit("login", res.data)

                        // auto log out after X seconds has passed(check out API to see the expiresIn value)
                        context.dispatch("setLogoutTimer", res.data.expiresIn)

                        let now = new Date(Date.now());
                        let expirationDate = new Date(now.getTime() + (res.data.expiresIn * 1000));
                        localStorage.setItem("expirationDate", expirationDate)
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("id", res.data.id);
                        localStorage.setItem("username", res.data.username);
                        localStorage.setItem("admin", res.data.admin);
                    }
                })
                .catch(() => {
                    context.state.invalidUser = true
                })
        },
        getUsers(context) {
            customisedUsersAxios.get("/users", {
                headers: {
                    'x-api-token': context.state.user.token
                }
            })
                .then(response => {
                    context.commit("getUsers", response.data)
                })
        },
        createUser(context, payload) {
            customisedUsersAxios.post("/users", payload, {
                headers: {
                    'x-api-token': context.state.user.token
                }
            })
                .then(response => {
                    context.commit("createUser", response.data)
                })
        },
        deleteUser(context, payload) {
            customisedUsersAxios.delete("/users/" + payload.id, {
                headers: {
                    'x-api-token': context.state.user.token
                }
            })
                .then(() => {
                    context.commit("deleteUser", payload)
                })
        },
        editUser(context, payload) {
            customisedUsersAxios.put("/users/" + payload.id, payload, {
                headers: {
                    'x-api-token': context.state.user.token
                }
            })
                .then(res => {
                    context.commit("editUser", res.data)
                })
        },
        logout(context) {
            context.commit("clearUserData")
        },
        setLogoutTimer(context, expirationTime) {
            setTimeout(() => {
                context.commit("clearUserData")
            }, expirationTime * 1000)
        },
        //dispatched in app.vue
        tryAutoLogin(context) {
            const token = localStorage.getItem("token");
            if (!token) return
            const expirationDate = localStorage.getItem("expirationDate")
            const now = Date.now()
            if (now >= new Date(expirationDate)) {
                context.commit("clearUserData")
                return
            }
            const id = localStorage.getItem("id")
            const username = localStorage.getItem("username")
            const admin = localStorage.getItem("admin")
            if (admin === "true") {
                context.state.isAdmin = true
            }
            context.commit("login", {
                id,
                username,
                admin,
                token
            })
        },
        // ********
        getCryptoData(context) {
            // async function getCrytoInformation(){
            //     const info = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=da29af3e-a894-43d1-805e-f64def15b26c")
            //     console.log(info);
                
            //     context.commit("saveCryptoDataLocally", info.data.data)
            //     const logos = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=" + context.state.cryptoIDs + "&CMC_PRO_API_KEY=da29af3e-a894-43d1-805e-f64def15b26c")
            //     context.commit("saveLogos", logos.data.data)
            // }
            axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=da29af3e-a894-43d1-805e-f64def15b26c")
                .then(response => {
                    context.commit("saveCryptoDataLocally", response.data.data)
                    return context.state.cryptoIDs
                })
                .then(ids => {
                    axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=" + ids + "&CMC_PRO_API_KEY=da29af3e-a894-43d1-805e-f64def15b26c")
                    .then(response => {
                        context.commit("saveLogos", response.data.data)
                    })
                })

        },
        getCryptoLogo(context) {
            axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=" + context.state.cryptoIDs + "&CMC_PRO_API_KEY=da29af3e-a894-43d1-805e-f64def15b26c")
                .then(response => {
                    context.commit("saveLogos", response.data.data)
                })

        }
    }
})
